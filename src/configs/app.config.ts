import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

const NodeEnv = {
  development: 'development',
  test: 'test',
  production: 'production',
} as const;

type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];

export class EnvironmentVariablesValidator {
  @IsString()
  port: string;

  @IsString()
  nodeEnv: NodeEnv;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  };
});
