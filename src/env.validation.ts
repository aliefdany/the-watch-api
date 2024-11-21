import { plainToInstance } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsDefined({ message: 'NODE_ENV is not defined in .env file' })
  @IsNotEmpty()
  @IsEnum(Environment, {
    message:
      'NODE_ENV should be one of this value: development, staging, production, test',
  })
  NODE_ENV: Environment;

  @IsDefined({ message: 'PORT is not defined in .env file' })
  @IsNotEmpty()
  @IsNumber({}, { message: 'PORT should be a number' })
  @Min(3000)
  @Max(3060)
  PORT: number;

  @IsDefined({ message: 'DATABASE_URL is not defined in .env file' })
  @IsNotEmpty()
  @IsString({ message: 'DATABASE_URL should be a string' })
  DATABASE_URL: string;

  @IsDefined({ message: 'JWT_SECRET is not defined in .env file' })
  @IsNotEmpty()
  @IsString({ message: 'DATABASE_URL should be a string' })
  JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
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
