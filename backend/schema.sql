DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    display_name TEXT NOT NULL,
    password TEXT NOT NULL,
    photo BLOB NOT NULL,
    wallet_address TEXT NOT NULL,
    UNIQUE(username);
);
