CREATE DATABASE taskmaster;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    status TEXT,
    comment TEXT,
    user_id_assigner INTEGER,
    user_id_assignee INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password_digest TEXT
);

INSERT INTO tasks (title, description, status, comment, user_id_assignee, user_id_assigner) VALUES ('Clean Dishes', 'Wash manually all dishes', 'In Progress', 'I hate it!', 1, 2);