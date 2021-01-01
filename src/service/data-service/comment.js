'use strict';

const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../../constants`);

class CommentService {
  /**
   * Return all coments from Article
   * @param {Object} article
   * @returns {Array} comments 
   */
  findAll(article) {
    return article.comments
  }

  /**
   * Delete some comment with commentId
   * @param {Object} article 
   * @param {String} commentId
   * @returns {String} deleted comments 
   */
  drop(article, commentId) {
    const dropComment = article.comments.find((comment) => comment.id === commentId);

    if (!dropComment) {
      return null;
    }

    article.comments = article.comments.filter((comment) => comment.id !== commentId);

    return dropComment;
  }

  /**
   * Create new comment to some article
   * @param {Object} article 
   * @param {String} comment
   * @returns {String} new comment
   */
  create(article, comment) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
    }, comment);

    article.comments.push(newComment);
    return comment;
  }
}

module.exports = CommentService;
