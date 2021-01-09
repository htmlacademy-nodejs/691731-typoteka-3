'use strict';

const {HttpCode} = require(`../../constants`);

const postKeys = [`title`, `category`, `announce`];

module.exports = (req, res, next) => {
  const newPost = req.body;
  const keys = Object.keys(newPost);
  const keyExist = postKeys.every((key) => keys.includes(key));

  if (!keyExist) {
    res
      .status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
