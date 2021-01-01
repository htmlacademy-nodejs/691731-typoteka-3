'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  /**
   * Search all articlec, which title includes searching text
   * @param {String} searchText
   * @returns {Array} articles 
   */
  findAll(searchText) {
    return this._articles
      .filter((article) => article.title.includes(searchText));
  }
};

module.exports = SearchService;