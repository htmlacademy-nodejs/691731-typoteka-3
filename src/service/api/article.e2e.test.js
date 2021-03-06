'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

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
    "createdDate": `Mon, 11 Jan 2021 20:18:14 GMT`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения.`,
    "categories": [`IT`],
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
  },
  {
    "title": `Как достигнуть успеха не вставая с кресла`,
    "createdDate": `Sat, 09 Jan 2021 16:55:26 GMT`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов.`,
    "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов.`,
    "categories": [`Разное`],
    "comments": [
      {
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`
      },
      {
        "text": `Совсем немного...`
      },
      {
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Совсем немного...`
      }
    ]
  },
  {
    "title": `Лучшие рок-музыканты 20-века`,
    "createdDate": `Tue, 05 Jan 2021 00:59:26 GMT`,
    "announce": `Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь.`,
    "categories": [`Музыка`],
    "comments": [
      {
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "text": `Мне кажется или я уже читал это где-то? Согласен с автором! Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "title": `Как собрать камни бесконечности`,
    "createdDate": `Fri, 08 Jan 2021 04:54:47 GMT`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь.`,
    "fullText": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "categories": [`Разное`],
    "comments": [
      {
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы! Это где ж такие красоты?`
      },
      {
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    "title": `Лучшие рок-музыканты 20-века`,
    "createdDate": `Thu, 07 Jan 2021 06:30:31 GMT`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "categories": [`Железо`],
    "comments": [
      {
        "text": `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Это где ж такие красоты?`
      },
      {
        "text": `Плюсую, но слишком много буквы! Совсем немного...`
      }
    ]
  }
];

const WRONG_ID = 100;

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, articles: mockData});
  const app = express();
  app.use(express.json());
  article(app, new ArticleService(mockDB), new CommentService(mockDB));
  return app;
};

describe(`Test GET /articles, only '+' scenario`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code is 200`, () =>
    expect(response.statusCode)
      .toBe(HttpCode.OK)
  );
  test(`Returns a list of mockData.length articles`, () =>
    expect(response.body.data.length)
      .toBe(mockData.length)
  );
  test(`first article's title equals mockData[0].title`, () =>
    expect(response.body.data[0].title)
      .toBe(mockData[0].title)
  );
});

describe(`Test GET /articles/1`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
        .get(`/articles/1`);
  });
  describe(`+`, () => {

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );
    test(`Article's title equal mockData[0].title`, () =>
      expect(response.body.data.title)
        .toBe(mockData[0].title)
    );
  });

  describe(`-`, () => {
    test(`If id is wrong, status code is 400`, () => {
      return request(app)
        .get(`/articles/${WRONG_ID}`)
        .expect(HttpCode.NOT_FOUND);
    });
  });
});

describe(`Test POST /articles`, () => {
  const newArticle = {
    title: `Some new title`,
    categories: [1, 2],
    announce: `Some short text of new article`,
    fullText: `Some full text of new article`,
  };
  let app;
  let response;

  describe(`+`, () => {

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .post(`/articles`)
        .send(newArticle);
    });

    test(`Status code is 201`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.CREATED)
    );

    test(`Articles count is changed`, () =>
      request(app)
        .get(`/articles`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) => expect(res.body.data.length).toBe(mockData.length + 1))
    );
  });

  describe(`-`, () => {
    beforeAll(async () => {
      app = await createAPI();
    });

    test(`Without any required property status code is 400`, async () => {
      for (const key of Object.keys(newArticle)) {
        const invalidArticle = {...newArticle};
        delete invalidArticle[key];

        await request(app)
          .post(`/articles`)
          .send(invalidArticle)
          .expect(HttpCode.BAD_REQUEST);
      }
    });
  });
});

describe(`Test PUT /articles/2`, () => {
  const newArticle = {
    title: `Some new title`,
    categories: [1],
    announce: `Some short text of new article`,
    fullText: `Some full text of artcle`,
  };

  describe(`+`, () => {
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .put(`/articles/2`)
        .send(newArticle);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );

    test(`Article is really changed`, () =>
      request(app)
        .get(`/articles/2`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) => expect(res.body.data.title).toBe(newArticle.title))
    );
  });

  describe(`-`, () => {
    let app;
    beforeAll(async () => {
      app = await createAPI();
    });

    test(`Status code is 404 when trying to change non-existent article`, async () => {
      request(app)
        .put(`/articles/${WRONG_ID}`)
        .send(newArticle)
        .expect(HttpCode.NOT_FOUND);
    });

    test(`Status code is 400 when trying to change an article with invalid data`, async () => {
      delete newArticle.title;

      return request(app)
        .put(`/articles/${WRONG_ID}`)
        .send(newArticle)
        .expect(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`Test DELETE /articles/articleId`, () => {
  describe(`+`, () => {
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .delete(`/articles/3`);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );

    test(`Articles has been reduced`, () =>
      request(app)
        .get(`/articles`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) => expect(res.body.data.length).toBe(mockData.length - 1))
    );
  });

  describe(`-`, () => {
    test(`API refuse to delete non-existen article`, async () => {
      const app = await createAPI();
      request(app)
        .delete(`/articles/${WRONG_ID}`)
        .expect(HttpCode.NOT_FOUND);
    });
  });
});

describe(`Test GET /articles/:articleId/comments`, () => {
  describe(`+`, () => {
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .get(`/articles/1/comments`);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );

    test(`API returns list of comments`, () =>
      expect(response.body.data.length)
        .toBe(mockData[0].comments.length)
    );

    test(`API returns corrects comments`, () => {
      for (let i = 0; i <= mockData[3].comments.length - 1; i++) {
        expect(response.body.data[i].text)
          .toBe(mockData[0].comments[i].text);
      }
    });
  });

  describe(`-`, () => {
    test(`Status code is 404 when trying to get comments for non-exist offer`, async () => {
      const app = await createAPI();

      return request(app)
        .get(`/articles/${WRONG_ID}/comments`)
        .expect(HttpCode.NOT_FOUND);
    });
  });
});

describe(`Test POST /articles/:articleId/comments`, () => {
  const newComment = {
    text: `Some new comment`
  };

  describe(`+`, () => {
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .post(`/articles/1/comments`)
        .send(newComment);
    });

    test(`Status code is 201`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.CREATED)
    );

    test(`Returns new comment`, () =>
      expect(response.body.data)
        .toEqual(expect.objectContaining(newComment))
    );

    test(`Counts of comments is change`, () =>
      request(app)
        .get(`/articles/1/comments`)
          // eslint-disable-next-line max-nested-callbacks
          .expect((res) =>
            expect(res.body.data.length)
              .toBe(mockData[0].comments.length + 1))
    );
  });

  describe(`-`, () => {
    let app;

    beforeAll(async () => {
      app = await createAPI();
    });

    test(`Status code is 404 if comments create for non-existen article`, () =>
      request(app)
        .post(`/articles/${WRONG_ID}/comments`)
          .send(newComment)
          .expect(HttpCode.NOT_FOUND)
    );

    test(`Code status is 404 if send invalid comments data`, () => {
      const invalidComment = {
        incorrectKey: `Key must called text`
      };

      return request(app)
        .post(`/articles/1/comments`)
        .send(invalidComment)
        .expect(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`Test DELETE /article/:articleId/comments/commentId`, () => {
  describe(`+`, () => {
    let app;
    let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .delete(`/articles/1/comments/1`);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );

    test(`Count of comments must decrease by one`, () =>
      request(app)
        .get(`/articles/1/comments`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) =>
          expect(res.body.data.length)
            .toBe(mockData[0].comments.length - 1)
        )
    );
  });

  describe(`-`, () => {
    let app;

    beforeAll(async () => {
      app = await createAPI();
    });

    test(`API refuse to delete comment from non-existent article`, () =>
      request(app)
        .delete(`/articles/${WRONG_ID}/comments/1`)
        .expect(HttpCode.NOT_FOUND)
    );

    test(`API refuse to delete non-existent comment from article`, () =>
      request(app)
        .delete(`/articles/1}/comments/${WRONG_ID}`)
        .expect(HttpCode.NOT_FOUND)
    );
  });
});
