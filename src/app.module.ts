import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchesModule } from './watches/watches.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './accounts/account.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './custom-validation.pipe';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    CacheModule.register({ ttl: 60 * 1000, isGlobal: true }),
    WatchesModule,
    PrismaModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
