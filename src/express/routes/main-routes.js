'use strict';

const {Router} = require(`express`);
const {ARTICLES_PER_PAGE} = require(`../../constants`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();

mainRoutes.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = ARTICLES_PER_PAGE;

  const offset = (page - 1) * ARTICLES_PER_PAGE;
  const [
    articlesData,
    categoriesData
  ] = await Promise.all([
    api.getArticles({limit, offset, comments: true}),
    api.getCategories(true)
  ]);

  const {count, articles} = articlesData.data;
  const categories = categoriesData.data;

  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);
  res.render(`main`, {articles, categories, page, totalPages});
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
