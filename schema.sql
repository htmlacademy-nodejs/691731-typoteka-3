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
  picture varchar(50)
);

CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  created_at timestamp DEFAULT current_timestamp
);

CREATE INDEX posts(title);
