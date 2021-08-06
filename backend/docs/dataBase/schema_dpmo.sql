
CREATE DATABASE IF NOT EXISTS  dpmo;
Use dpmo;

CREATE TABLE IF NOT EXISTS users (
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(250) NOT NULL,
 password VARCHAR(120) NOT NULL,
 bio VARCHAR(500) null,
 avatar VARCHAR(250),
 rol ENUM("admin","reader","partner") DEFAULT "reader",
 created_at DATETIME NOT NULL,
 updated_at DATETIME  NULL,
 verified_at DATETIME NULL,
 verification_code VARCHAR(90) NOT NULL,
 PRIMARY KEY (id)
);

select * from news;
select * from users;


CREATE TABLE  IF NOT EXISTS news (
id INT NOT NULL AUTO_INCREMENT,
news_title VARCHAR(250) NOT NULL,
news_lead VARCHAR(250) NOT NULL,
news_text VARCHAR(2000) NOT NULL,
picture VARCHAR(250) NOT NULL,
category VARCHAR(50),
created_at DATETIME NOT NULL,
id_user INT NOT NULL,
counter_news INT DEFAULT 0,
updated_at DATETIME NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);


-- CREATE TABLE IF NOT EXISTS categories (
-- id INT NOT NULL AUTO_INCREMENT,
-- category VARCHAR(100) NOT NULL,
-- id_news  INT NOT NULL,
-- PRIMARY KEY (id),
-- FOREIGN KEY (id_news) REFERENCES news(id) ON DELETE CASCADE
-- );

CREATE TABLE IF NOT EXISTS comments (
id INT NOT NULL AUTO_INCREMENT,
comment VARCHAR(500) NOT NULL,
created_at DATETIME NOT NULL,
comment_like INT DEFAULT 0,
comment_dislike INT DEFAULT 0,
updated_at DATETIME NULL,
id_user INT NOT NULL,
id_news  INT NOT NULL,
id_answered  INT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_news) REFERENCES news(id) ON DELETE CASCADE,
FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (id_answered) REFERENCES comments(id) ON DELETE CASCADE
);




CREATE TABLE IF NOT EXISTS votes (
id INT NOT NULL AUTO_INCREMENT,
vote BOOLEAN,
id_user INT NOT NULL,
id_news  INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_news) REFERENCES news(id) ON DELETE CASCADE,
FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

