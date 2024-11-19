import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountService } from './accounts.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AccountService],
  imports: [PrismaModule],
  exports: [AccountService],
})
export class AccountModule {}
