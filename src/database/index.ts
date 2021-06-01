import { getConnectionOptions, createConnection, getConnection } from 'typeorm';

const createTypeormConn = {
  async create() {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    return createConnection({ ...connectionOptions, name: 'default' });
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    try {
      const connection = getConnection('default');
      const entities = connection.entityMetadatas;

      const promises = entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name);
        return repository.query(`DELETE FROM ${entity.tableName}`);
      });

      return Promise.all(promises);
    } catch (error) {
      throw new Error('Erro ao limpar as tabelas');
    }
  },
};
export { createTypeormConn };

createTypeormConn.create();
