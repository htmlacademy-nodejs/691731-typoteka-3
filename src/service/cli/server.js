'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../api`);
const { API_PREFIX, ExitCode, HttpCode } = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);
app.use((req, res) => {
  res
    .status(HttpCode.BAD_REQUEST)
    .send(`Not found`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [userPort] = args;
    const serverPort = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    try {
      app.listen(serverPort, (err) => {
        if (err) {
          return console.error(chalk.red(`Error while creating server: ${err}`));
        }

        return console.info(chalk.green(`Server start on port ${serverPort}`));
      });
    } catch (err) {
      console.error(chalk.red(`Error: ${err}`));
      process.exit(ExitCode.ERROR);
    }
  }
};
