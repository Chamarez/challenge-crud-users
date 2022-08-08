import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { BcryptModule } from './bcrypt/bcrypt.module';

export const AppImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test', 'staging', 'production')
        .default('development'),
      APP_PORT: Joi.number().default(3000),
      APP_PREFIX: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      CRYPTO_SECRET_KEY: Joi.string().required(),
      MONGO_URL: Joi.string().required(),
    }),
  }),

  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get('MONGO_URL'),
    }),
    inject: [ConfigService],
  }),
  AuthModule,
  UsersModule,
  BcryptModule,
];
