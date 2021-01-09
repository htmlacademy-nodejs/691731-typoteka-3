'use strict';

const {Router} = require(`express`);

const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => {
  res.render(`my`, {isColorBackground: `color`});
});

myRoutes.get(`/comments`, (req, res) => {
  res.render(`comments`, {isColorBackground: `noColor`});
});

module.exports = myRoutes;
