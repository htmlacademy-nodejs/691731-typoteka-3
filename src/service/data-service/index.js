'use strict';

const CategoryService = require(`./category`);
const ArticleService = require(`./article`);
const CommentService = require(`./comment`);
const SearchService = require(`./search`);

module.exports = {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
};
