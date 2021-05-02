"use strict";

const Sequelize = require(`sequelize`);
const Aliase = require(`../models/aliase`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._ArticleCategory = sequelize.models.ArticleCategory;
  }
  /**
   * Return list of all categories
   * @param {Any} needCount - if needCount === undefine or null, then method return categories wthout count
   * @return {Array} list of categories
   */
  async findAll(needCount) {
    console.log(typeof needCount);
    if (needCount !== null || needCount !== undefined) {
      const result = await this._Category.findAll({
        attributes: [
          `id`,
          `name`,
          [
            Sequelize.fn(
                `COUNT`,
                `*`
            ),
            `count`
          ]
        ],
        group: [Sequelize.col(`Category.id`)],
        include: [{
          model: this._ArticleCategory,
          as: Aliase.ARTICLE_CATEGORIES,
          attributes: []
        }]
      });
      return result.map((it) => it.get());
    }
    return this._Category.findAll({raw: true});
  }
}

module.exports = CategoryService;
