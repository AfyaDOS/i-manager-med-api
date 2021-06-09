import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

const connection = {
  async create() {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    return createConnection({ ...connectionOptions, name: 'default' });
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    try {
      const connect = getConnection('default');
      const entities = connect.entityMetadatas;

      const promises = entities.map(async (entity) => {
        const repository = connect.getRepository(entity.name);
        return repository.query(`DELETE FROM ${entity.tableName}`);
      });

      return Promise.all(promises);
    } catch (error) {
      throw new Error('Erro ao limpar as tabelas');
    }
  },
};

export default connection;
