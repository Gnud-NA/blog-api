import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './database-config.type';
import validateConfig from 'src/utils/validate-config';
import { IsString } from 'class-validator';

const DB_TYPE = 'postgres';
export class EnvironmentVariablesValidator {
  @IsString()
  URL: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    type: DB_TYPE,
    url: process.env.URL || '',
    synchronous: false,
    autoloadEntity: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  };
});
