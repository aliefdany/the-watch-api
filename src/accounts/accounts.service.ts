import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Account> {
    const account = this.prisma.account.findUnique({ where: { id } });

    if (!account) {
      throw new NotFoundException();
    }
    return account;
  }
}
