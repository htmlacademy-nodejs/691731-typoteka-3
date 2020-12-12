'use strict';

const { Router } = require(`express`);
const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => {
  res.render(`main`);
});

mainRoutes.get(`/register`, (req, res) => {
  res.render(`register`);
});

mainRoutes.get(`/login`, (req, res) => {
  res.render(`sign-in`);
});

mainRoutes.get(`/search`, (req, res) => {
  res.render(`search`);
});

mainRoutes.get(`/categories`, (req, res) => {
  res.render(`categories`);
})

module.exports = mainRoutes;
