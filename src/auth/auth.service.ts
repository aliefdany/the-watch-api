import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signin(username: string, password: string): Promise<AuthEntity> {
    const account = await this.prisma.account.findUnique({
      where: { username },
    });

    if (!account) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = account.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ accountId: account.id }),
    };
  }
}
