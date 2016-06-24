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

INSERT INTO toDoList (user_id, taskname, description) VALUES ('1', 'Homework', 'Due on 07/26/2016'),
('1', 'Bank Payment','Due on 07/28/2016'),
('1', 'Mortgage Payment','Due on 07/29/2016'),
('1', 'CS 316 Project','Due on 08/01/2016'),
('1', 'Car Payment','Due on 08/05/2016'),
('1', 'Doctor appoinment','Due on 08/10/2016'),
('2', 'Homework', 'Due on 07/26/2016'),
('2', 'Bank Payment','07/28/2016'),
('2', 'Mortgage Payment','Due on 07/29/2016'),
('2', 'CS 316 Project','Due on 08/01/2016'),
('2', 'Car Payment','Due on 08/05/2016'),
('2', 'Doctor appoinment','Due on 08/10/2016'),
('3', 'Homework', 'Due on 07/26/2016'),
('3', 'Bank Payment','07/28/2016'),
('3', 'Mortgage Payment','Due on 07/29/2016'),
('3', 'CS 316 Project','Due on 08/01/2016'),
('3', 'Car Payment','Due on 08/05/2016'),
('3', 'Doctor appoinment','Due on 08/10/2016'),
('4', 'Homework', 'Due on 07/26/2016'),
('4', 'Bank Payment','07/28/2016'),
('4', 'Mortgage Payment','Due on 07/29/2016'),
('4', 'CS 316 Project','Due on 08/01/2016'),
('4', 'Car Payment','Due on 08/05/2016'),
('4', 'Doctor appoinment','Due on 08/10/2016')




