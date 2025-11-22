import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'eazy',
  database: 'greenkode',
  synchronize: false,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});
