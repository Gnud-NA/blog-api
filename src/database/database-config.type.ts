import { DatabaseType } from 'typeorm';

export type DatabaseConfig = {
  type: DatabaseType;
  url: string;
  synchronous: boolean;
  autoloadEntity: boolean;
};
