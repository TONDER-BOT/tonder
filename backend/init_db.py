import sqlite3

import base64
connection = sqlite3.connect('identifire.sqlite')
print(connection)

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

users = [
    ('johndoe', 'password123', 'johndoe',
     'address1', 'chino', '1.jpg', 'image/jpeg', 'telegram1'),
    ('janedoe', 'password456', 'janedoe',
     'address2', 'chino', '2.jpg', 'image/jpeg', 'telegram2'),
    ('bobsmith', 'password789', 'bobsmith',
     'address3', 'chino', '3.jpg', 'image/jpeg', 'telegram3')
]


for user in users:
    with open(user[5], 'rb') as f:
        photo_data = f.read()
        photo_content_type = user[6]
        cur.execute("INSERT INTO users (username, password, display_name, wallet_address, description, telegram_id) VALUES (?, ?, ?, ?, ?, ?)",
                    (user[0], user[1], user[2], user[3], user[4], user[7]))
        user_id = cur.lastrowid
        cur.execute("INSERT INTO user_photo (user_id, photo, content_type) VALUES (?, ?, ?)",
                    (user_id, photo_data, photo_content_type))

connection.commit()
connection.close()
