import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.URL,
  migrations: [__dirname + '/typeorm-migrations/*.{ts,js}'],
  entities: [__dirname + '/../**/entity/*.{ts,js}'],
});
