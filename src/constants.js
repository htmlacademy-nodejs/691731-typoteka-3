'use strict';

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.USER_ARGV_INDEX = 2;
module.exports.MAX_ID_LENGTH = 6;
module.exports.API_PREFIX = `/api`;
module.exports.ARTICLES_PER_PAGE = 8;

module.exports.ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 400,
  BAD_REQUEST: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports.MessageStatus = {
  SUCCESS: `success`,
  FAIL: `fail`,
  ERROR: `error`,
};

module.exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};
