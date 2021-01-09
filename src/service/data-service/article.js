'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  /**
   * Return all articles
   * @return {Array} articles
   */
  findAll() {
    return this._articles;
  }

  /**
   * Return article with id
   * @param {String} id
   * @return {Object} article
   */
  findOne(id) {
    return this._articles.find((it) => it.id === id);
  }

  /**
   * Create new article
   * @param {Object} article
   * @return {Object} new article
   */
  create(article) {
    const newArticle = Object
      .assign({
        id: nanoid(MAX_ID_LENGTH),
        createdDate: new Date(),
        comments: []
      }, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  /**
   * Update exist article
   * @param {String} id
   * @param {Object} article
   * @return {Object} updated article
   */
  update(id, article) {
    const oldArticle = this._articles.find((it) => it.id === id);

    const newArticle = Object
      .assign({
        createdDate: new Date(),
      }, article);


    return Object.assign(oldArticle, newArticle);
  }

  /**
   * Delete article with articleId
   * @param {String} articleId
   * @return {Object} deleted article
   */
  drop(articleId) {
    const article = this._articles.find((it) => it.id === articleId);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((it) => it.id !== article.id);

    return article;
  }
}

module.exports = ArticleService;
