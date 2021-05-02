'use strict';

const {Op} = require(`sequelize`);
const Aliase = require(`../models/aliase`);

class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  /**
   * Search all articlec, which title includes searching text
   * @param {String} searchText
   * @return {Array} articles
   */
  async findAll(searchText) {
    const artcles = await this._Article.findAll({
      where: {
        title: {
          [Op.substring]: searchText,
        }
      },
      include: [Aliase.CATEGORIES],
    });
    return artcles.map((article) => article.get());
  }
}

module.exports = SearchService;
