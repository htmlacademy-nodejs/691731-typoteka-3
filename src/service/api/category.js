'use strict';

const {Router} = require(`express`);
const {HttpCode, MessageStatus} = require(`../../constants`);

module.exports = (app, categoryService) => {
  const route = new Router();
  app.use(`/categories`, route);

  // GET /api/categories — возвращает список категорий
  route.get(`/`, async (req, res) => {
    const {count} = req.query;
    const categories = await categoryService.findAll(count);
    res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: categories
      });
  });
};
