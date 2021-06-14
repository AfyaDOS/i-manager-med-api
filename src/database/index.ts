import { Connection, getConnection, getConnectionManager, getConnectionOptions } from 'typeorm';

let defaultConnection: Connection | undefined;

const typeOrmConnection = {
  async create() {
    try {
      const connectionManager = getConnectionManager();

      const connectionOptions = await getConnectionOptions(
        process.env.NODE_ENV,
      );

      if (!connectionManager.has('default')) {
        connectionManager.create({ ...connectionOptions, name: 'default' });
      }

      return connectionManager.get().connect();
    } catch (error) {
      if (defaultConnection?.isConnected) {
        await defaultConnection.close();
        defaultConnection = undefined;
      }
      throw new Error(error.message);
    }
  },

  async close() {
    try {
      const connectionManager = getConnectionManager();

      if (connectionManager.has('default')) {
        await connectionManager.get().close();
      }
    } catch (error) {
      console.log(error);
      if (defaultConnection?.isConnected) {
        await defaultConnection.close();
        defaultConnection = undefined;
      }
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

export default typeOrmConnection;
