import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './accounts.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Account } from '@prisma/client';

describe('AccountService', () => {
  let service: AccountService;
  let prismaService: PrismaService;

  const mockAccount: Account = {
    id: 1,
    username: 'alief',
    password: 'random123',
    roleId: 1,
  };

  const mockPrismaService = {
    account: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    prismaService = module.get<PrismaService>(PrismaService);

    mockPrismaService.account.findUnique.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an account if found', async () => {
      mockPrismaService.account.findUnique.mockResolvedValue(mockAccount);

      const result = await service.findOne(1);
      expect(result).toEqual(mockAccount);
      expect(prismaService.account.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if account is not found', async () => {
      mockPrismaService.account.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(prismaService.account.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
