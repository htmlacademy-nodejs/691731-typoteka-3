/*
  Get all categories (id, title)
*/
SELECT * FROM categories;

/*
  Get not empty categories (id, title)
*/
SELECT id, title FROM categories
  JOIN post_categories ON id = category_id
  GROUP BY id;

/*
  Get categories with count's posts (category id, category title, count of posts)
*/
SELECT id, title, count(post_id) FROM categories
  LEFT JOIN post_categories ON id = category_id
  GROUP BY id;

/*
  Get posts list (post id, post title, announce of post, image, date of post, author firstname, author lastname, author email, count of comments, titles of category). Sorted by date - first new.
*/
SELECT 
  posts.id,
  posts.title,
  SUBSTRING(posts.text, 1, 100) AS announce,
  posts.created_at,
  STRING_AGG(DISTINCT pictures.picture, ', ') AS picture_list,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.title, ', ') AS category_list,
  users.firstname,
  users.lastname,
  users.email
FROM posts
  LEFT JOIN pictures ON pictures.post_id = posts.id
  JOIN post_categories ON posts.id = post_categories.post_id
  JOIN categories ON post_categories.category_id = categories.id
  LEFT JOIN comments ON comments.post_id = posts.id
  JOIN users ON users.id = posts.user_id
  GROUP BY posts.id, users.id, pictures.id
  ORDER BY posts.created_at DESC;

/*
  Get get detail information about post with id = 1 (post id, post title, announce of post, full text of posts, image, date of post, author firstname, author lastname, author email, count of comments, titles of category).
*/
SELECT
  posts.id,
  posts.title,
  SUBSTRING(posts.text, 1, 100) AS announce,
  posts.text,
  posts.created_at,
  STRING_AGG(DISTINCT pictures.picture, ', ') AS picture_list,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.title, ', ') AS category_list,
  users.firstname,
  users.lastname,
  users.email
FROM posts
  LEFT JOIN pictures ON pictures.post_id = posts.id
  JOIN post_categories ON posts.id = post_categories.post_id
  JOIN categories ON post_categories.category_id = categories.id
  LEFT JOIN comments ON comments.post_id = posts.id
  JOIN users ON users.id = posts.user_id
WHERE posts.id = 1
  GROUP BY posts.id, users.id, pictures.id;

/*
  Get list of 5 fresh comments (id, post's id, author firstname, author lastname, text of comment)
*/
SELECT
  comments.id,
  comments.post_id,
  users.firstname,
  users.lastname,
  users.email,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
  ORDER BY comments.created_at DESC
  LIMIT 5;

/*
  Get comments list for post with id = 1 (id, post's id, author firstname, author lastname, text of comment). Sorted by date of created - new first.
*/
SELECT
  comments.id,
  comments.post_id,
  users.firstname,
  users.lastname,
  users.email,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
WHERE comments.post_id = 1
  ORDER BY comments.created_at DESC;

/*
  Update title of post with id = 1
*/
UPDATE posts SET title = 'Как я встретил Новый год' WHERE id = 1;
