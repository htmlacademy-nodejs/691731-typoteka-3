'use strict';

const {Router} = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();

mainRoutes.get(`/`, async (req, res) => {
  const [
    articlesData,
    categoriesData
  ] = await Promise.all([
    api.getArticles(true),
    api.getCategories(true)
  ]);

  const articles = articlesData.data;
  const categories = categoriesData.data;
  res.render(`main`, {articles, categories});
});

mainRoutes.get(`/register`, (req, res) => {
  res.render(`register`);
});

mainRoutes.get(`/login`, (req, res) => {
  res.render(`sign-in`);
});

mainRoutes.get(`/search`, (req, res) => {
  res.render(`search`, {
    isColorBackground: `baseColor`
  });
});

mainRoutes.get(`/search-result`, async (req, res) => {
  const {search} = req.query;
  const results = await api.search(search);

  res.render(`search-result`, {
    isColorBackground: `baseColor`,
    search,
    results
  });
});

mainRoutes.get(`/categories`, (req, res) => {
  res.render(`categories`);
});

module.exports = mainRoutes;
