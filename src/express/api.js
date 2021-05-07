'use strict';

const axios = require(`axios`);

class API {
  constructor(baseURL, timeout = 1000) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getArticles(comments) {
    return this._load(`/articles`, {params: {comments}});
  }

  getArticleId(id) {
    return this._load(`/articles/${id}`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getCategories(count) {
    return this._load(`/categories`, {params: {count}});
  }

  async createArticle(data) {
    const {body} = this._load(`/articles`, {
      method: `POST`,
      json: data,
      responseType: `json`
    });

    return body;
  }
}

const PORT = process.env.API_PORT || 3000;
const DEFAULT_URL = `http://localhost:${PORT}/api/`;

const defaultAPI = new API(DEFAULT_URL);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
