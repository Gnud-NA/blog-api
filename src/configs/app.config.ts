import { registerAs } from '@nestjs/config';
import { AppConfig, NodeEnv } from './app-config.type';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

export class EnvironmentVariablesValidator {
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  NODE_ENV: NodeEnv;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  };
});
