import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchesModule } from './watches/watches.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [WatchesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
