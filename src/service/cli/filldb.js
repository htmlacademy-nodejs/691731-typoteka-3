'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const path = require(`path`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);
const {getLogger} = require(`../lib/logger`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils.js`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;

const FILE_CATEGORIES_PATH = `../../../data/categories.txt`;
const FILE_SENTENCES_PATH = `../../../data/sentences.txt`;
const FILE_TITLES_PATH = `../../../data/titles.txt`;
const FILE_COMMENTS_PATH = `../../../data/comments.txt`;

const MAX_COMMENTS = 5;

const logger = getLogger({});

const generateCommments = (count, comments) => {
  return Array(count)
    .fill({})
    .map(() => ({
      text: shuffle(comments)
        .slice(0, getRandomInt(1, 3))
        .join(` `),
    }));
};

const generateImgName = () => {
  const imgName = [`forest`, `sea`, `skyscraper`];
  return Array(1).fill({}).map(() => ({
    src: imgName[getRandomInt(0, imgName.length - 1)]
  }));
};

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
};

const generateArticles = (count, options) => {
  const {titles, sentences, categories, comments} = options;

  return Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences).slice(1, 10).join(` `),
      pictures: generateImgName(),
      categories: getRandomSubarray(categories),
      comments: generateCommments(getRandomInt(1, MAX_COMMENTS), comments)
    }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.trim().split(`\n`).filter((it) => it.trim());
  } catch (err) {
    logger.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error ocured: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }

    logger.info(`Connection to database established`);

    const {Article, Category} = defineModels(sequelize);
    await sequelize.sync({force: true});

    const categoriesContent = await readContent(path.resolve(__dirname, FILE_CATEGORIES_PATH));

    const categoryModels = await Category.bulkCreate(
        categoriesContent.map((item) => ({name: item}))
    );

    const options = {
      titles: await readContent(path.resolve(__dirname, FILE_TITLES_PATH)),
      sentences: await readContent(path.resolve(__dirname, FILE_SENTENCES_PATH)),
      categories: categoryModels,
      comments: await readContent(path.resolve(__dirname, FILE_COMMENTS_PATH)),
    };

    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const articles = generateArticles(countArticles, options);

    console.log(articles);

    const articlesPromisees = articles.map(async (article) => {
      const articleModel = await Article.create(article, {include: [Aliase.COMMENTS, Aliase.PICTURES]});
      await articleModel.addCategories(article.categories);
    });

    await Promise.all(articlesPromisees);
  }
};
