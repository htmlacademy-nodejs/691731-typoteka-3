'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const category = require(`./category`);
const CategoryService = require(`../data-service/category`);

const {HttpCode} = require(`../../constants`);

const mockCategories = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const mockData = [
  {
    "title": `Лучшие рок-музыканты 20-века`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения.`,
    "categories": [`IT`, `Железо`],
    "comments": [
      {
        "text": `Это где ж такие красоты?`
      },
      {
        "text": `Согласен с автором!`
      },
      {
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  }
];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, articles: mockData});
  category(app, new CategoryService(mockDB));
});

describe(`test GET /categories, only +`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code is 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of categories`, () => expect(response.body.data.length).toBe(mockCategories.length));
  test(`API returns correct names of categories`,
      () => expect(response.body.data.map((it) => it.name)).toEqual(
          expect.arrayContaining(mockCategories)
      )
  );
});
