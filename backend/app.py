import base64

import dotenv
import os
from flask_jwt_extended import JWTManager, create_access_token
from flask import Flask, request, jsonify
from database import Database

app = Flask(__name__)
jwt = JWTManager()
db = Database()
dotenv.load_dotenv()
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
jwt.init_app(app)


@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    display_name = request.form['display_name']
    wallet_address = request.form['wallet_address']
    description = request.form['desc']
    telegram_id = request.form['telegram_id']
    user_data = {
        'username': username,
        'password': password,
        'display_name': display_name,
        'wallet_address': wallet_address,
        'description': description,
        'telegram_id': telegram_id
    }
    user_id = db.insert_user(user_data)
    if not user_id:
        return jsonify({'message': 'User already exists'}), 409
    return jsonify({'user_id': user_id, 'message': 'User registered successfully!'}), 201


@app.route('/login', methods=['POST'])
def login():
    login_data = request.json
    username = login_data['username']
    password = login_data['password']
    user_data = db.user_login(username)
    if not user_data:
        return jsonify({'message': 'Invalid username'})
    if user_data and user_data['password'] == password:
        access_token = create_access_token(identity=username)
        return jsonify({'user_id': user_data['id'], 'message': 'Login successful!', access_token: access_token}), 200
    else:
        return jsonify({'message': 'Invalid username or password'})


@app.route('/<user_id>', methods=['GET'])
def profile(user_id):
    user_data = db.find_user(user_id)
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/<user_id>/match', methods=['POST'])
def like(user_id):
    liked_user_id = request.json['target_user_id']
    prefer = request.json['prefer']
    db.like_user(user_id, liked_user_id, prefer)
    return jsonify({'message': 'User liked successfully!'})

# Add more routes for location tracking and distance calculation


@app.route('/')
async def index():
    datas = db.get_all_users()
    return datas


@app.route('/<user_id>/photos', methods=['GET'])
def get_user_photos(user_id):
    photos = db.get_user_photos(user_id)
    return jsonify({'photos': photos}), 200


@app.route('/<user_id>/photos', methods=['POST'])
def upload_user_photos(user_id):
    photo = request.files['photo']
    user_photo_id = db.add_user_photos(user_id, photo)
    return jsonify({'message': 'Success!', 'user_photo_id': user_photo_id}), 201


@app.route('/<user_id>/photos/<photo_id>', methods=['DELETE'])
def delete_user_photo(user_id, photo_id):
    photo = db.get_user_photo_by_id(user_id, photo_id)
    if not photo or photo['user_id'] != int(user_id):
        return jsonify({'message': 'Photo not found'}), 404
    db.delete_user_photo(photo_id)
    return jsonify({'message': 'Photo deleted successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
