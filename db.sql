CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL
)

CREATE TABLE books (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL
)

CREATE TABLE borrows ( 
	id INT  AUTO_INCREMENT PRIMARY KEY, 
	userId INT NOT NULL, 
	bookId INT NOT NULL, 
	returned BOOLEAN DEFAULT FALSE, 
	score INT DEFAULT -1, 
	FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE, 
	FOREIGN KEY (bookId) REFERENCES Books(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (userId, bookId)
)	