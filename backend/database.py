import sqlite3
import base64


class Database:
    def __init__(self):
        self.conn = None

    def create_table(self):
        self.connect()
        with self.conn.execute('''
            DROP TABLE IF EXISTS users;
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                display_name TEXT NOT NULL,
                photo BLOB NOT NULL,
                wallet_address TEXT NOT NULL,
                description TEXT NOT NULL
            );
        '''):
            self.conn.commit()
        self.conn.close()

    def connect(self):
        self.conn = sqlite3.connect('identifire.sqlite')
        self.conn.row_factory = sqlite3.Row

    def close(self):
        self.conn.close()

    def insert_user(self, user_data):
        self.connect()
        username = user_data['username']
        password = user_data['password']
        display_name = user_data['display_name']
        wallet_address = user_data['wallet_address']
        description = user_data['description']
        cursor = self.conn.cursor()
        try:
            cursor.execute("INSERT INTO users (username, password, display_name, wallet_address, description) VALUES (?, ?, ?, ?, ?)",
                           (username, password, display_name, wallet_address, description))

            user_id = cursor.lastrowid
            self.conn.commit()
            return user_id
        except:
            self.close()
            return None

    def find_user(self, user_id):
        with self.conn.execute("SELECT * FROM users WHERE id=? LIMIT 1", (user_id,)) as cursor:
            result = cursor.fetchone()
            if result:
                user_data = {
                    'id': result[0],
                    'username': result[1],
                    'display_name': result[3],
                    'wallet_address': result[4],
                    'desc': result[5],
                    'telegram_id': result[6],
                }

                return user_data
            else:
                return None
    # find user by username

    def user_login(self, username, password):
        with self.conn.execute("SELECT * FROM users WHERE username = ? LIMIT 1", (username)) as cursor:
            result = cursor.fetchone()
            if result:
                user_login_data = {
                    'id': result[0],
                    'username': result[1],
                    'password': result[2],
                }

                return user_login_data
            else:
                return False

    def get_all_users(self):
        self.connect()
        results = self.conn.execute("SELECT * FROM users").fetchall()
        ret = []
        for result in results:
            user_data = {
                'id': result[0],
                'username': result[1],
                'display_name': result[3],
                'wallet_address': result[4],
                'desc': result[5],
            }
            ret.append(user_data)
        self.close()
        return ret

    def get_user_photos(self, user_id):
        self.connect()
        results = self.conn.execute(
            "SELECT * FROM user_photo WHERE user_id = ?", (user_id,)).fetchall()
        ret = []
        for result in results:
            user_photo_data = {
                'id': result[0],
                'user_id': result[1],
                'photo_data': f'data:{result[3]};base64,{base64.b64encode(result[2]).decode("utf-8")}',
            }
            ret.append(user_photo_data)
        self.close()
        return ret

    def add_user_photos(self, user_id, photo):
        self.connect()
        photo_data = photo.read()
        photo_content_type = photo.content_type
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO user_photo (user_id, photo, content_type) VALUES (?, ?, ?)",
                       (user_id, photo_data, photo_content_type))
        user_photo_id = cursor.lastrowid
        self.conn.commit()

        return user_photo_id

    def get_user_photo_by_id(self, user_id, user_photo_id):
        self.connect()
        result = self.conn.execute(
            "SELECT * FROM user_photo WHERE id = ? AND user_id = ?", (user_photo_id, user_id)).fetchone()
        if not result:
            return None
        user_photo_data = {
            'id': result[0],
            'user_id': result[1],
            'photo_data': f'data:{result[3]};base64,{base64.b64encode(result[2]).decode("utf-8")}',
        }
        return user_photo_data

    def delete_user_photo(self, user_photo_id):
        self.connect()
        self.conn.execute(
            "DELETE FROM user_photo WHERE id=?", (user_photo_id,))
        self.conn.commit()

    def get_candidates(self, user_id):
        self.connect()
        results = self.conn.execute("""
            SELECT id, username, display_name, description, telegram_id
            FROM users
            WHERE id NOT IN (
                SELECT likee_id FROM matching WHERE liker_id = ?
            ) AND id != ?
        """, (user_id, user_id)).fetchall()
        ret = []
        for result in results:
            ret.append({
                'id': result['id'],
                'username': result['username'],
                'display_name': result['display_name'],
                'telegram_id': result['telegram_id'],
                'description': result['description'],
            })
        print(ret)
        return ret
# add try catch to avoid duplicate insert data
# add jwt annotation to protect api

    def get_match(self, liker_id, likee_id):
        self.connect()
        result = self.conn.execute("""
            SELECT like_matching_user FROM matching
            WHERE liker_id = ? AND likee_id = ?
        """, (liker_id, likee_id)).fetchone()
        if not result or result['like_matching_user'] == 0:
            return False
        return True

    def rate_user(self, liker_id, likee_id, prefer):
        self.connect()
        # write data in to db
        self.conn.execute("INSERT INTO matching (liker_id, likee_id, like_matching_user) VALUES (?, ?, ?)",
                          (liker_id, likee_id, prefer))
        self.conn.commit()
        # check if they like each other
        if prefer and self.get_match(likee_id, liker_id):
            return {"liker_id": liker_id, "likee_id": likee_id, "match": True}
        return {"liker_id": liker_id, "likee_id": likee_id, "match": False}
