import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  environmentClass: ClassConstructor<T>,
) {
  const validatedConfig = plainToInstance(environmentClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export default validateConfig;
