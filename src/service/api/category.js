'use strict';

const {Router} = require(`express`);
const {HttpCode, MessageStatus} = require(`../../constants`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  // GET /api/categories — возвращает список категорий
  route.get(`/`, async (req, res) => {
    const {count} = req.query;
    const categories = await categoryService.findAll(count);
    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: categories
      });
  });
};
