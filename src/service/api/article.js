'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);
const articleExist = require(`../middleware/article-exist`);
const articleValidator = require(`../middleware/article-validaor`);
const commentValidator = require(`../middleware/comment-validator`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  // GET /api/articles — ресурс возвращает список публикаций
  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res
      .status(HttpCode.OK)
      .json(articles);
  });

  // GET /api/articles/:articleId — возвращает полную информацию о публикации
  route.get(`/:articleId`, (req, res) => {
    const { articleId } = req.params;
    const article = articleService.findOne(articleId);
  
    if (!article) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Article with id: ${articleId} didn't found`);
    }

    return res
      .status(HttpCode.OK)
      .json(article);
  });

  // POST /api/articles — создаёт новую публикацию;
  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res
      .status(HttpCode.CREATED)
      .json(article);
  });

  // PUT /api/articles/:articleId — редактирует определённую публикацию;
  route.put(`/:articleId`, articleValidator, (req, res) => {
    const { articleId } = req.params;
    const existArticle = articleService.findOne(articleId);

    if (!existArticle) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Article with id ${articleId} didn't found`);
    }

    const updateArticle = articleService.update(articleId, req.body);

    return res
      .status(HttpCode.OK)
      .json(updateArticle);
  });

  // DELETE /api/articles/:articleId — удаляет определённое публикацию;
  route.delete(`/:articleId`, (req, res) => {
    const { articleId } = req.params;
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

  // GET /api/articles/:articleId/comments — возвращает список комментариев определённой публикации;
  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const { article } = res.locals;
    const comments = commentService.findAll(article);

    return res
      .status(HttpCode.OK)
      .json(comments);
  });

  // DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const { article } = res.locals;
    const { commentId } = req.params;
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
    const { article } = res.locals;
    const comment = commentService.create(article, req.body);

    return res
      .status(HttpCode.OK)
      .json(comment);
  });
}
