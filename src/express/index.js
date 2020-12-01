'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const articlesRoutes = require(`./routes/articles-routes`);
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);

const app = express();
const PORT = 8000;

app.use(`/`, mainRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);

app.listen(PORT, () => {
  console.log(chalk.green(`The server is running on port ${PORT}`));
});
