'use strict';

const {Router} = require(`express`);
const articlesRoutes = new Router();

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);
const api = require(`../api`).getAPI();

const UPLOAD_DIR = `../upload/img`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});


articlesRoutes.get(`/add`, (req, res) => {
  res.render(`articles/add`);
});

articlesRoutes.get(`/category/:id`, (req, res) => {
  res.render(`articles/category`);
});

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [body, categories] = await Promise.all([
    api.getArticleId(id),
    api.getCategories()
  ]);
  const article = body.data;
  res.render(`articles/edit`, {article, categories});
});

articlesRoutes.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`articles/add`, {categories});
});

articlesRoutes.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;
  const articleData = {
    pictures: [{src: file.filename}],
    createdDate: new Date(),
    id: nanoid(MAX_ID_LENGTH),
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    categories: body.category,
    comments: []
  };
  console.log(articleData);
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`back`);
  }
});

articlesRoutes.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const body = await api.getArticleId(id);
  const article = body.data;
  res.render(`articles/post`, {article});
});

module.exports = articlesRoutes;
