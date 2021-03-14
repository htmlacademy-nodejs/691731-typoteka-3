/*
  Fill table of users
*/
INSERT INTO users (firstname, lastname, email, password_hash, avatar) VALUES
('Tony', 'Stark', 'iron-man@example.local', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar-1'),
('Stive', 'Rodger', 'capitan@example.local', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar-2');

/*
  Fill table of categories
*/
INSERT INTO categories (title) VALUES
('IT'),
('Programming'),
('Lifestyle'),
('Trees'),
('Music'),
('Films'),
('Hardware'),
('Other');

/*
  Fill table of posts
*/
ALTER TABLE posts DISABLE TRIGGER ALL;
INSERT INTO posts (title, text, user_id) VALUES
('Учим HTML и CSS', 'Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.', 1),
('Лучшие рок-музыканты 20-века', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.', 1),
('Как достигнуть успеха не вставая с кресла', 'Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.',2);
ALTER TABLE posts ENABLE TRIGGER ALL;

/*
  Fill table of post_categories
*/
ALTER TABLE post_categories DISABLE TRIGGER ALL;
INSERT INTO post_categories (post_id, category_id) VALUES
(1, 1),
(1, 3),
(1, 2),
(2, 3),
(2, 5),
(2, 8),
(3, 4),
(3, 6),
(3, 7);
ALTER TABLE post_categories ENABLE TRIGGER ALL;

/*
  Fill table of picture
*/
ALTER TABLE pictures DISABLE TRIGGER ALL;
INSERT INTO pictures (picture, post_id) VALUES
('forest', 1),
('sea', 2),
('skyscrapper', 3);
ALTER TABLE pictures ENABLE TRIGGER ALL;

/*
  Fill table of comments
*/
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id, post_id) VALUES
('Это где ж такие красоты?', 1, 2),
('Совсем немного...', 1, 1),
('Согласен с автором!', 1, 2),
('Мне кажется или я уже читал это где-то?', 2, 2),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 2, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 2),
('Хочу такую же футболку :-)', 3, 1),
('Плюсую, но слишком много буквы!', 3, 2),
('Планируете записать видосик на эту тему?', 3, 1);
ALTER TABLE comments ENABLE TRIGGER ALL;
