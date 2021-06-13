import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

const connection = {
  async create() {
    try {
      const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

      return createConnection({ ...connectionOptions, name: 'default' });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async close() {
    try {
      const connect = getConnection('default');

      if (connect.isConnected) await connect.close();
    } catch (error) {
      throw new Error(error.message);
    }
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
