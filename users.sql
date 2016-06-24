DROP DATABASE IF EXISTS appdb;
CREATE DATABASE appDB;

\c appdb


CREATE TABLE users (
	id	serial primary	key,
	username 	text,
	password 	text	
);

CREATE TABLE toDoList
(
    id serial PRIMARY KEY,
    user_id	int references	users(id),
    taskname text NOT NULL,
    description text NOT NULL
);

INSERT INTO users (username, password) VALUES ('Mahedi', '1234'),
('Muhaiminul', '1234'),
('Redwon', '1234'),
('Jack', '1234');

INSERT INTO toDoList (user_id, taskname, description) VALUES ('1', 'Homework', 'Due on Monday'),
('1', 'Bank Payment','Due on Tuesday'),
('2', 'Homework', 'Due on Tuesday'),
('3', 'Doctors appoinment', 'Due on Monday'),
('3', 'Homework', 'Due on Tuesday'),
('3', 'Car Payment', 'Due on Monday'),
('4', 'Loan Payment', 'Due on Friday');




