'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  // GET /api/categories — возвращает список категорий
  route.get(`/`, async (req, res) => {
    const categories = await categoryService.findAll();
    res
      .status(HttpCode.OK)
      .json(categories);
  });
};
