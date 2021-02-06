'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const {API_PREFIX, ExitCode, HttpCode, MessageStatus} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const logger = getLogger({name: `api`});

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code is ${res.statusCode}`);
  });
  next();
});
app.use(API_PREFIX, routes);
app.use((req, res) => {
  res
    .status(HttpCode.BAD_REQUEST)
    .json({
      message: MessageStatus.ERROR,
      data: []
    });

  logger.error(`${res.body.message}: Route not found: ${req.url}`);
});
app.use((err, req, res, _next) => {
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({
      message: MessageStatus.FAIL,
      data: []
    });

  logger.error(`${res.body.message}: An error occured on processing request: ${err.message}`);
});

process.on(`unhandledRejection`, (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

module.exports = {
  name: `--server`,
  // eslint-disable-next-line consistent-return
  async run(args) {
    const [userPort] = args;
    const serverPort = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    try {
      await app.listen(serverPort);
      return logger.info(`Server start on port ${serverPort}`);
    } catch (err) {
      logger.error(chalk.red(`Error: ${err}`));
      process.exit(ExitCode.ERROR);
    }
  }
};
