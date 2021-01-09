'use strict';

class CategoryService {
  constructor(posts) {
    this._posts = posts;
  }
  /**
   * Return list of all categories
   * @return {Array} list of categories
   */
  findAll() {
    const categories = this._posts.reduce((acc, post) => {
      post.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
