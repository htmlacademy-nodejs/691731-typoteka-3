'use strict';

const { Router } = require(`express`);

const articlesRoutes = new Router();

articlesRoutes.get(`/add`, (req, res) => {
  res.send(`/articles/add`);
});

articlesRoutes.get(`/category/:id`, (req, res) => {
  res.send(`/articles/category/${req.params.id}`);
});

articlesRoutes.get(`/edit/:id`, (req, res) => {
  res.send(`/articles/edit/${req.params.id}`);
});

articlesRoutes.get(`/:id`, (req, res) => {
  res.send(`/articles/${req.params.id}`);
});

module.exports = articlesRoutes;
