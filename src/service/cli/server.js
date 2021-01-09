'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../api`);
const {API_PREFIX, ExitCode, HttpCode, MessageStatus} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);
app.use((req, res) => {
  res
    .status(HttpCode.BAD_REQUEST)
    .json({
      message: MessageStatus.ERROR,
      data: []
    });
});
app.use((err, req, res, _next) => {
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({
      message: MessageStatus.FAIL, // Ощибку в зависимости от режима запуска реализую в следующем задании
      data: []
    });
});

module.exports = {
  name: `--server`,
  // eslint-disable-next-line consistent-return
  async run(args) {
    const [userPort] = args;
    const serverPort = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    try {
      await app.listen(serverPort);
      return console.info(chalk.green(`Server start on port ${serverPort}`));
    } catch (err) {
      console.error(chalk.red(`Error: ${err}`));
      process.exit(ExitCode.ERROR);
    }
  }
};
