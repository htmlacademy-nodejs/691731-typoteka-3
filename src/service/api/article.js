'use strict';

const {Router} = require(`express`);
const {HttpCode, MessageStatus} = require(`../../constants`);
const articleExist = require(`../middleware/article-exist`);
const articleValidator = require(`../middleware/article-validator`);
const commentValidator = require(`../middleware/comment-validator`);


module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(`/articles`, route);

  // GET /api/articles — return list of articles
  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    const articles = (limit || offset) ? await articleService.findPage({limit, offset, comments}) : await articleService.findAll(comments);
    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: articles
      });
  });

  // GET /api/articles/:articleId — return article with some id
  route.get(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: MessageStatus.ERROR,
          data: [],
        });
    }

    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: article
      });
  });

  // POST /api/articles — create new article;
  // eslint-disable-next-line consistent-return
  route.post(`/`, articleValidator, async (req, res, next) => {
    try {
      const article = await articleService.create(req.body);
      return res
        .status(HttpCode.CREATED)
        .json({
          status: MessageStatus.SUCCESS,
          data: article
        });
    } catch (err) {
      next(err);
    }
  });

  // PUT /api/articles/:articleId — edit article with some id;
  route.put(`/:articleId`, articleValidator, async (req, res) => {
    const {articleId} = req.params;
    const existArticle = await articleService.findOne(articleId);

    if (!existArticle) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: MessageStatus.ERROR,
          data: []
        });
    }

    const updateArticle = await articleService.update(articleId, req.body);

    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: updateArticle
      });
  });

  // DELETE /api/articles/:articleId — delete article with some id;
  route.delete(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: MessageStatus.ERROR,
          data: []
        });
    }

    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: article
      });
  });

  // GET /api/articles/:articleId/comments — return list of comments from article with some id;
  route.get(`/:articleId/comments`, articleExist(articleService), async (req, res) => {
    const {articleId} = req.params;
    const comments = await commentService.findAll(articleId);

    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: comments
      });
  });

  // DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), async (req, res) => {
    const {commentId} = req.params;
    const deletedComment = await commentService.drop(commentId);

    if (!deletedComment) {
      return res
        .status(HttpCode.NOT_FOUND)
        .json({
          status: MessageStatus.ERROR,
          data: {}
        });
    }

    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: deletedComment
      });
  });

  // POST /api/articles/:articleId/comments — создаёт новый комментарий;
  // eslint-disable-next-line consistent-return
  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], async (req, res, next) => {
    try {
      const {articleId} = req.params;
      const comment = await commentService.create(articleId, req.body);

      return res
        .status(HttpCode.CREATED)
        .json({
          status: MessageStatus.SUCCESS,
          data: comment
        });
    } catch (err) {
      next(err);
    }
  });
};
