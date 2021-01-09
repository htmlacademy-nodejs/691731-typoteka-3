'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleExist = require(`../middleware/article-exist`);
const articleValidator = require(`../middleware/article-validaor`);
const commentValidator = require(`../middleware/comment-validator`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  // GET /api/articles — return list of articles
  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res
      .status(HttpCode.OK)
      .json(articles);
  });

  // GET /api/articles/:articleId — return article with some id
  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: `error`,
          data: [],
        });
    }

    return res
      .status(HttpCode.OK)
      .json(article);
  });

  // POST /api/articles — create new article;
  // eslint-disable-next-line consistent-return
  route.post(`/`, articleValidator, (req, res, next) => {
    try {
      const article = articleService.create(req.body);
      return res
        .status(HttpCode.CREATED)
        .json(article);
    } catch (err) {
      next(err);
    }
  });

  // PUT /api/articles/:articleId — edit article with some id;
  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const existArticle = articleService.findOne(articleId);

    if (!existArticle) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: `error`,
          data: []
        });
    }

    const updateArticle = articleService.update(articleId, req.body);

    return res
      .status(HttpCode.OK)
      .json(updateArticle);
  });

  // DELETE /api/articles/:articleId — delete article with some id;
  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.drop(articleId);

    if (!article) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Article with id ${articleId} didn't found`);
    }

    return res
      .status(HttpCode.OK)
      .json(article);
  });

  // GET /api/articles/:articleId/comments — return list of comments from article with some id;
  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    return res
      .status(HttpCode.OK)
      .json(comments);
  });

  // DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res
      .status(HttpCode.OK)
      .json(deletedComment);
  });

  // POST /api/articles/:articleId/comments — создаёт новый комментарий;
  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    return res
      .status(HttpCode.OK)
      .json(comment);
  });
};
