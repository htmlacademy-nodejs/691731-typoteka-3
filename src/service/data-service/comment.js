'use strict';

class CommentService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
  }
  /**
   * Return all coments from Article
   * @param {Object} articleId
   * @return {Array} comments
   */
  findAll(articleId) {
    return this._Comment.findAll({
      where: {articleId},
      raw: true,
    });
  }

  /**
   * Delete some comment with commentId
   * @param {Number} id
   * @param {String} commentId
   * @return {String} deleted comments
   */
  drop(id) {
    const deletedRows = this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  /**
   * Create new comment to some article
   * @param {Object} articleId
   * @param {String} comment
   * @return {String} new comment
   */
  create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment
    });
  }
}

module.exports = CommentService;
