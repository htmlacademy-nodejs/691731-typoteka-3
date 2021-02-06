'use strict';

const got = require(`got`);

class API {
  constructor(prefixUrl, timeout = 1000) {
    this._http = got.extend({
      prefixUrl,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http({url, ...options});
    return JSON.parse(response.body);
  }

  getArticles() {
    return this._load(`articles`);
  }

  getArticleId(id) {
    return this._load(`articles/${id}`);
  }

  search(query) {
    return this._load(`search`, {searchParams: {query}});
  }

  getCategories() {
    return this._load(`categories`);
  }

  async createArticle(data) {
    const {body} = this._load(`articles`, {
      method: `POST`,
      json: data,
      responseType: `json`
    });

    return body;
  }
}

const PORT = process.env.API_PORT || 3000;
const DEFAULT_URL = `http://localhost:${PORT}/api`;

const defaultAPI = new API(DEFAULT_URL);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
