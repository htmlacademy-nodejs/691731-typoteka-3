'use strict';

const {Router} = require(`express`);

const articlesRoutes = new Router();

articlesRoutes.get(`/add`, (req, res) => {
  res.render(`articles/add`);
});

articlesRoutes.get(`/category/:id`, (req, res) => {
  res.render(`articles/category`);
});

articlesRoutes.get(`/edit/:id`, (req, res) => {
  res.render(`articles/edit`);
});

articlesRoutes.get(`/:id`, (req, res) => {
  res.render(`articles/post`);
});

module.exports = articlesRoutes;
