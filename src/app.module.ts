import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchesModule } from './watches/watches.module';

@Module({
  imports: [WatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
