import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.URL,
  synchronize: false,
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
