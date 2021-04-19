"use strict";

const {Model} = require(`sequelize`);

const defineArticle = require(`./article`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const definePicture = require(`./picture`);

const Aliase = require(`./aliase`);

class ArticleCategory extends Model {}

const define = (sequelize) => {
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Picture = definePicture(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  Article.hasMany(Picture, {as: Aliase.PICTURES, foreignKey: `articleId`});
  Picture.belongsTo(Article, {foreignKey: `articleId`});

  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});

  return {Article, ArticleCategory, Category, Comment, Picture};
};

module.exports = define;
