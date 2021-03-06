'use strict';

const {Router} = require(`express`);
const {HttpCode, MessageStatus} = require(`../../constants`);

const route = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, route);

  // GET /api/search?query= — возвращает результаты поиска. Поиск публикаций выполняется по заголовку. Публикация соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.
  route.get(`/`, async (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json({
          status: MessageStatus.ERROR,
          data: []
        });
    }

    const searchResults = await searchService.findAll(query);

    return res
      .status(HttpCode.OK)
      .json({
        status: MessageStatus.SUCCESS,
        data: searchResults
      });
  });
};
