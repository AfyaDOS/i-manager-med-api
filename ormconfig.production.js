module.exports = {
  name: 'production',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  keepConnectionAlive: true,
  logging: false,
  synchronize: false,
  entities: ['src/database/entity/*.js'],
};
