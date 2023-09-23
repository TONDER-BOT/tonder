DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    display_name TEXT NOT NULL,
    wallet_address TEXT NOT NULL,
    description TEXT NOT NULL,
    telegram_id TEXT NOT NULL
);

DROP TABLE  IF EXISTS user_photo;

CREATE TABLE user_photo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    photo BLOB NOT NULL,
    content_type TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);