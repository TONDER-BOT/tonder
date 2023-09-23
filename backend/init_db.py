import sqlite3

import base64
connection = sqlite3.connect('jdbc:sqlite:identifire.sqlite')
print(connection)

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

users = [
    ('johndoe', 'password123', 'johndoe', '1.jpg', 'address1', 'chino'),
    ('janedoe', 'password456', 'janedoe', '2.jpg', 'address2', 'chino'),
    ('bobsmith', 'password789', 'bobsmith', '3.jpg', 'address3', 'chino')
]
for user in users:
    with open(user[3], 'rb') as f:

        blobData = base64.b64encode(f.read())
        cur.execute("INSERT INTO users (username, password, display_name, photo, wallet_address, description) VALUES (?, ?, ?, ?, ?, ?)",
                    (user[0], user[1], user[2], blobData, user[4], user[5]))

connection.commit()
connection.close()
