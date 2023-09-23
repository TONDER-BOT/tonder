from flask import Flask, request, jsonify
from database import Database

app = Flask(__name__)
db = Database()


@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    birthday = request.form['birthday']
    gender = request.form['gender']
    photo = request.files['photo']
    user_data = {
        'username': username,
        'password': password,
        'birthday': birthday,
        'gender': gender,
        'photo': photo
    }
    user_id = db.insert_user(user_data)
    if not user_id:
        return jsonify({'message': 'User already exists'})
    return jsonify({'user_id': user_id, 'message': 'User registered successfully!'})


@app.route('/login', methods=['POST'])
def login():
    login_data = request.json
    username = login_data['username']
    password = login_data['password']
    user_data = db.user_login(username)
    if not user_data:
        return jsonify({'message': 'Invalid username'})
    if user_data and user_data['password'] == password:
        return jsonify({'user_id': user_data['id'], 'message': 'Login successful!'})
    else:
        return jsonify({'message': 'Invalid username or password'})


@app.route('/<user_id>', methods=['GET'])
def profile(user_id):
    user_data = db.find_user(user_id)
    if user_data:
        return jsonify(user_data)
    else:
        return jsonify({'message': 'User not found'})


@app.route('/<user_id>/match', methods=['POST'])
def like(user_id):
    liked_user_id = request.json['target_user_id']
    prefer = request.json['prefer']
    db.like_user(user_id, liked_user_id, prefer)
    return jsonify({'message': 'User liked successfully!'})

# Add more routes for location tracking and distance calculation


@app.route('/<user_id>', methods=['POST'])
@app.route('/')
async def index():
    db.connect()
    datas = db.get_all_users()
    db.close()
    return datas

if __name__ == '__main__':
    app.run(debug=True)
