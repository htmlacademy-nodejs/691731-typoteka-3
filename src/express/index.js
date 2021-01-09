'use strict';

const express = require(`express`);
const path = require(`path`);
const chalk = require(`chalk`);

const articlesRoutes = require(`./routes/articles-routes`);
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);

const {HttpCode} = require(`../constants`);

const app = express();
const PORT = 8000;
const PUBLIC_DIR = `public`;

app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);

app.use((req, res) => {
  res
    .status(HttpCode.BAD_REQUEST)
    .render(`errors/404`);
});

app.use((err, _req, res, _next) => {
  console.log(err);
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .render(`errors/500`);
});

app.listen(PORT, () => {
  console.log(chalk.green(`The server is running on port ${PORT}`));
});
