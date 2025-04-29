import buildApp from '../../server/index';
import { knex as createKnex } from 'knex';
import knexConfig from '../../server/knexfile.js'; // правильный путь
import { Model } from 'objection';

export function setStandardBeforeEach() {
  let app;
  let knex;
  let models;
  let testData;
  let cookie;

  return () => {
    // Создание нового инстанса knex для тестов
    knex = createKnex(knexConfig.test);

    // Подключение Objection к knex
    Model.knex(knex);

    // Создание нового приложения
    app = buildApp({ knex });

    // Твои модели (например через app.objection.models)
    models = app.objection.models;

    // Загружаем тестовые данные
    // testData = await loadFixtures();

    return { app, knex, models, testData, cookie };
  };
}
