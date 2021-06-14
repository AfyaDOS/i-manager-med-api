import { Connection, createConnection, getConnection, getConnectionOptions } from 'typeorm';

let defaultConnection: Connection;

const connection = {
  async create() {
    try {
      const connectionOptions = await getConnectionOptions(
        process.env.NODE_ENV,
      );

      if (!defaultConnection?.isConnected) {
        defaultConnection = await createConnection({ ...connectionOptions, name: 'default' });
      }

      return defaultConnection;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async close() {
    try {
      if (defaultConnection?.isConnected) await defaultConnection.close();
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

connection.create().then(() => console.log('Database is connected'));
