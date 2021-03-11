DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS comments;

CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(250) NOT NULL
);

CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname varchar(250) NOT NULL,
  lastname varchar(250) NOT NULL,
  email varchar(250) UNIQUE NOT NULL,
  password_hash varchar(250) NOT NULL,
  avatar varchar(50)
);

CREATE TABLE posts(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(250) NOT NULL,
  text text NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
          ON DELETE SET NULL
          ON UPDATE SET NULL
);

CREATE TABLE post_categories (
  post_id integer NOT NULL,
  category_id integer NOT NULL,
  CONSTRAINT post_categories_pk PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES posts (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
);

CREATE TABLE pictures(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  images text NOT NULL,
  post_id integer,
  FOREIGN KEY (post_id) REFERENCES posts
          ON DELETE CASCADE
          ON UPDATE CASCADE
);

CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  user_id integer NOT NULL,
  post_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users
          ON DELETE CASCADE
          ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts
          ON DELETE CASCADE
          ON UPDATE CASCADE
);

CREATE unique INDEX title_id ON posts (title);
