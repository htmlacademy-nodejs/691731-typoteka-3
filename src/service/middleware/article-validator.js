'use strict';

const {HttpCode} = require(`../../constants`);

const postKeys = [`title`, `categories`, `announce`];

module.exports = (req, res, next) => {
  const newPost = req.body;
  const keys = Object.keys(newPost);
  const keyExist = postKeys.every((key) => keys.includes(key));

  if (!keyExist) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};
