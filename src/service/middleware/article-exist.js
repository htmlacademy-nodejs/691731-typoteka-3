'use strict';

const {HttpCode} = require(`../../constants`);

// eslint-disable-next-line consistent-return
module.exports = (articleService) => (req, res, next) => {
  const {articleId} = req. params;
  const article = articleService.findOne(articleId);
  if (!article) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Post with id ${articleId} not found`);
  }

  res.locals.article = article;
  next();
};
