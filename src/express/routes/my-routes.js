'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const myRoutes = new Router();

myRoutes.get(`/`, async (req, res) => {
  const body = await api.getArticles();
  const myArticles = body.data.slice(0, 3);
  res.render(`my`, {
    isColorBackground: `color`,
    myArticles
  });
});

myRoutes.get(`/comments`, async (req, res) => {
  const body = await api.getArticles();
  const myArticles = body.data.slice(0, 3);
  res.render(`comments`, {
    isColorBackground: `noColor`,
    myArticles
  });
});

module.exports = myRoutes;
