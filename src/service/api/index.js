'use strict';

const {Router} = require(`express`);
const article = require(`./article`);
const category = require(`./category`);
const search = require(`./search`);

const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);


const app = new Router();

defineModels(sequelize);

(() => {
  article(app, new ArticleService(sequelize), new CommentService(sequelize));
  category(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
})();

module.exports = app;
