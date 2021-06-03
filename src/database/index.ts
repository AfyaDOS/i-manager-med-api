import { createConnection, getConnection } from 'typeorm';

const connection = {
  async create() {
    return createConnection({
      type: 'postgres',
      host: 'tuffi.db.elephantsql.com',
      url: 'postgres://xhmkdamg:koESJwiMq-deJ_r73f5KO3AAbFh4mNfr@tuffi.db.elephantsql.com/xhmkdamg',
      port: 5432,
      username: 'xhmkdamg',
      password: 'koESJwiMq-deJ_r73f5KO3AAbFh4mNfr',
      database: 'xhmkdamg',
      logging: false,
      synchronize: false,
      entities: ['src/database/entity/*.ts'],
    });
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    try {
      const connection2 = getConnection('default');
      const entities = connection2.entityMetadatas;

      const promises = entities.map(async (entity) => {
        const repository = connection2.getRepository(entity.name);
        return repository.query(`DELETE FROM ${entity.tableName}`);
      });

      return Promise.all(promises);
    } catch (error) {
      throw new Error('Erro ao limpar as tabelas');
    }
  },
};
export default connection;
connection.create();
