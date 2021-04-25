'use strict';

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
  }
  /**
   * Return list of all categories
   * @return {Array} list of categories
   */
  findAll() {
    return this._Category.findAll({raw: true});
  }
}

module.exports = CategoryService;
