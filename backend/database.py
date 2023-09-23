import sqlite3


class Database:
    def __init__(self):
        self.conn = None

    def create_table():
        conn = sqlite3.connect('database.db')
        with conn.execute('''
            DROP TABLE IF EXISTS users;
            CREATE TABLE users
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            display_name TEXT NOT NULL,
            photo BLOB NOT NULL,
            wallet_address TEXT NOT NULL,
            UNIQUE(username));
        '''):
            conn.commit()
        conn.close()

    def connect(self):
        self.conn = sqlite3.connect('database.db')
        self.conn.row_factory = sqlite3.Row

    def close(self):
        self.conn.close()

    def insert_user(self, user_data):
        username = user_data['username']
        password = user_data['password']
        display_name = user_data['display_name']
        wallet_address = user_data['wallet_address']
        with open(user_data['photo'], 'rb') as f:
            photo_binary = f.read()
        cursor = self.conn.cursor()
        try:
            cursor.execute("INSERT INTO users (username, password, display_name, photo, wallet_address) VALUES (?, ?, ?, ?, ?)",
                           (username, password, display_name, wallet_address, photo_binary))
            self.conn.commit()
            user_id = cursor.lastrowid
            return user_id
        except:
            return None

    def find_user(self, user_id):
        with self.conn.execute("SELECT * FROM users WHERE id=? LIMIT 1", (user_id,)) as cursor:
            result = cursor.fetchone()
            if result:
                user_data = {
                    'id': result[0],
                    'username': result[1],
                    'display_name': result[3],
                    'photo': result[4].decode('utf-8'),
                    'wallet_address': result[5],
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
                'password': result[2],
                'photo': result[5].decode('utf-8'),
            }
            ret.append(user_data)
        return ret
