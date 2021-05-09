'use strict';

const Aliase = require(`../models/aliase`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Category = sequelize.models.Category;
    this._Comment = sequelize.models.Comment;
    this._Picture = sequelize.models.Picture;
  }

  /**
   * Return all articles with comments, or without comments
   * @param {Boolean} needComments
   * @return {Array} articles
   */
  async findAll(needComments) {
    const include = [Aliase.CATEGORIES, Aliase.PICTURES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }
    const articles = await this._Article.findAll({include});
    return articles.map((item) => item.get());
  }

  /**
   * Return {limit} articles started on {offset} article
   */
  async findPage({limit, offset, comments}) {
    const include = [Aliase.CATEGORIES, Aliase.PICTURES];
    if (comments) {
      include.push(Aliase.COMMENTS);
    }
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include,
      distict: true,
    });
    console.log(offset);
    return {count, articles: rows};
  }

  /**
   * Return article with id
   * @param {Number} id
   * @return {Object} article
   */
  findOne(id) {
    return this._Article.findByPk(id, {include: [Aliase.CATEGORIES, Aliase.PICTURES, Aliase.COMMENTS]});
  }

  /**
   * Create new article
   * @param {Object} articleData
   * @return {Object} new article
   */
  async create(articleData) {
    const newArticle = await this._Article.create(articleData, {include: [Aliase.PICTURES]});
    await newArticle.addCategories(articleData.categories);

    return newArticle.get();
  }

  /**
   * Update exist article
   * @param {String} id
   * @param {Object} article
   * @return {Boolean} Did article was update?
   */
  async update(id, article) {
    const [affectedRows] = await this._Article.update(article, {
      where: {id}
    });

    return !!affectedRows;
  }

  /**
   * Delete article with articleId
   * @param {Number} id
   * @return {Object} deleted article
   */
  async drop(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });
    return !!deletedRows;
  }
}

module.exports = ArticleService;
