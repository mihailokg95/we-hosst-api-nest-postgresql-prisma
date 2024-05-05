import { UsersService } from '../users/users.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    const verified = await argon2.verify(user.password, password);
    if (user && verified) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid password');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = {
      username: email,
      sub: {
        name: user.firstName,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refresh(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.firstName,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
