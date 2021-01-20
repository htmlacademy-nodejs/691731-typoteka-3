'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `J3nuc9`,
    "title": `Лучшие рок-музыканты 20-века`,
    "createdDate": `Mon, 11 Jan 2021 20:18:14 GMT`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения.`,
    "category": [`IT`],
    "comments": [
      {
        "id": `v_l9eZ`,
        "text": `Это где ж такие красоты?`
      },
      {
        "id": `QEdeX7`,
        "text": `Согласен с автором!`
      },
      {
        "id": `1r5hhh`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    "id": `iDzglF`,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "createdDate": `Sat, 09 Jan 2021 16:55:26 GMT`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов.`,
    "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов.`,
    "category": [`Разное`],
    "comments": [
      {
        "id": `qlm6rQ`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`
      },
      {
        "id": `EuT_x7`,
        "text": `Совсем немного...`
      },
      {
        "id": `0AavlO`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `UuZnVN`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Совсем немного...`
      }
    ]
  },
  {
    "id": `rXBj4c`,
    "title": `Лучшие рок-музыканты 20-века`,
    "createdDate": `Tue, 05 Jan 2021 00:59:26 GMT`,
    "announce": `Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь.`,
    "category": [`Музыка`],
    "comments": [
      {
        "id": `KIO9bP`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `IHQB43`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `1O7NHo`,
        "text": `Мне кажется или я уже читал это где-то? Согласен с автором! Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `NY5pbj`,
    "title": `Как собрать камни бесконечности`,
    "createdDate": `Fri, 08 Jan 2021 04:54:47 GMT`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь.`,
    "fullText": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "category": [`Разное`],
    "comments": [
      {
        "id": `cpR33b`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы! Это где ж такие красоты?`
      },
      {
        "id": `Md2RlI`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    "id": `cDKmyc`,
    "title": `Лучшие рок-музыканты 20-века`,
    "createdDate": `Thu, 07 Jan 2021 06:30:31 GMT`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "category": [`Железо`],
    "comments": [
      {
        "id": `Rh4t0s`,
        "text": `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Это где ж такие красоты?`
      },
      {
        "id": `UevJZf`,
        "text": `Плюсую, но слишком много буквы! Совсем немного...`
      }
    ]
  }
];

const WRONG_ID = `WRONG_ID`;

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new ArticleService(cloneData), new CommentService());
  return app;
};

describe(`Test GET /articles, only '+' scenario`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
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
  test(`first article's id equals mockData[0].id`, () =>
    expect(response.body.data[0].id)
      .toBe(mockData[0].id)
  );
});

describe(`Test GET /articles/:id`, () => {
  describe(`+`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/articles/${mockData[0].id}`);
    });

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
      const app = createAPI();

      return request(app)
        .get(`/articles/${WRONG_ID}`)
        .expect(HttpCode.NOT_FOUND);
    });
  });
});

describe(`Test POST /articles`, () => {
  const newArticle = {
    title: `Some new title`,
    category: `Some new category`,
    announce: `Some short text of new article`,
  };

  describe(`+`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post(`/articles`)
        .send(newArticle);
    });

    test(`Status code is 201`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.CREATED)
    );

    test(`Returns article created`, () =>
      expect(response.body.data)
        .toEqual(expect.objectContaining(newArticle))
    );

    test(`Articles count is changed`, () =>
      request(app)
        .get(`/articles`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) => expect(res.body.data.length).toBe(mockData.length + 1))
    );
  });

  describe(`-`, () => {
    const app = createAPI();

    test(`Without any required property status code is 400`, async () =>{
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

describe(`Test PUT /articles/articlesId`, () => {
  const newArticle = {
    title: `Some new title`,
    category: `Some new category`,
    announce: `Some short text of new article`,
  };

  describe(`+`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app)
        .put(`/articles/${mockData[1].id}`)
        .send(newArticle);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(200)
    );

    test(`Returns changed article`, () =>
      expect(response.body.data)
        .toEqual(expect.objectContaining(newArticle))
    );

    test(`Article is really changed`, () =>
      request(app)
        .get(`/articles/${mockData[1].id}`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) => expect(res.body.data.title).toBe(mockData[1].title))
    );
  });

  describe(`-`, () => {
    const app = createAPI();

    test(`Status code is 404 when trying to change non-existent article`, () =>
      request(app)
        .put(`/articles/${WRONG_ID}`)
        .send(newArticle)
        .expect(HttpCode.NOT_FOUND)
    );

    test(`Status code is 400 when trying to change an article with invalid data`, () => {
      delete newArticle.title;

      return request(app)
        .put(`/articles/${WRONG_ID}`)
        .send(newArticle)
        .expect(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`Test DELETE /articles/articleId`, () => {
  const app = createAPI();

  describe(`+`, () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .delete(`/articles/${mockData[2].id}`);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );

    test(`Returns deleted article`, () =>
      expect(response.body.data.id)
        .toBe(mockData[2].id)
    );

    test(`Articles has been reduced`, () =>
      request(app)
        .get(`/articles`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) => expect(res.body.data.length).toBe(mockData.length - 1))
    );
  });

  describe(`-`, () => {
    test(`API refuse to delete non-existen article`, () =>
      request(app)
        .delete(`/articles/${WRONG_ID}`)
        .expect(HttpCode.NOT_FOUND)
    );
  });
});

describe(`Test GET /articles/:articleId/comments`, () => {
  describe(`+`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/articles/${mockData[3].id}/comments`);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );

    test(`API returns list of comments`, () =>
      expect(response.body.data.length)
        .toBe(mockData[3].comments.length)
    );

    test(`API returns corrects comments`, () => {
      for (let i = 0; i <= mockData[3].comments.length - 1; i++) {
        expect(response.body.data[i].id)
          .toBe(mockData[3].comments[i].id);
      }
    });
  });

  describe(`-`, () => {
    test(`Status code is 404 when trying to get comments for non-exist offer`, () => {
      const app = createAPI();

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
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post(`/articles/${mockData[1].id}/comments`)
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
        .get(`/articles/${mockData[1].id}/comments`)
          // eslint-disable-next-line max-nested-callbacks
          .expect((res) =>
            expect(res.body.data.length)
              .toBe(mockData[1].comments.length + 1))
    );
  });

  describe(`-`, () => {
    const app = createAPI();

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
        .post(`/articles/${mockData[1].id}/comments`)
        .send(invalidComment)
        .expect(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`Test DELETE /article/:articleId/comments/commentId`, () => {
  describe(`+`, () => {
    const app = createAPI();
    let response;

    beforeAll(async () => {
      response = await request(app)
        .delete(`/articles/${mockData[1].id}/comments/${mockData[1].comments[1].id}`);
    });

    test(`Status code is 200`, () =>
      expect(response.statusCode)
        .toBe(HttpCode.OK)
    );

    test(`Returns deleted comment`, () =>
      expect(response.body.data)
        .toEqual(expect.objectContaining(mockData[1].comments[1]))
    );

    test(`Count of comments must decrease by one`, () =>
      request(app)
        .get(`/articles/${mockData[1].id}/comments`)
        // eslint-disable-next-line max-nested-callbacks
        .expect((res) =>
          expect(res.body.data.length)
            .toBe(mockData[1].comments.length - 1)
        )
    );
  });

  describe(`-`, () => {
    const app = createAPI();

    test(`API refuse to delete comment from non-existent article`, () =>
      request(app)
        .delete(`/articles/${WRONG_ID}/comments/${mockData[1].comments[1].id}`)
        .expect(HttpCode.NOT_FOUND)
    );

    test(`API refuse to delete non-existent comment from article`, () =>
      request(app)
        .delete(`/articles/${mockData[1].id}/comments/${WRONG_ID}`)
        .expect(HttpCode.NOT_FOUND)
    );
  });
});
