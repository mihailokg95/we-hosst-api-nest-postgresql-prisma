import { UsersService } from '../users/users.service';

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto, res: Response) {
    try {
      const foundUser = await this.userService.findOneByEmail(
        createUserDto.email,
      );
      if (foundUser) {
        throw new ConflictException('E-mail already in use');
      }

      const user = await this.userService.createUser({
        ...createUserDto,
        email: createUserDto.email,
        password: await this.hashPassword(createUserDto.password),
        firstName: createUserDto.firstName,
      });
      if (!user) {
        throw new ForbiddenException('Could not create user');
      }
      return this.login(createUserDto, res);
    } catch (error: any) {
      return error.response;
    }
  }

  async hashPassword(password: string) {
    const hashed = await argon2.hash(password);
    return hashed;
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User doesnt exist');
    }
    const verified = await argon2.verify(user.password, password);
    if (!verified) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid password');
  }

  async login(body: LoginDto, res: Response) {
    const { email, password } = body;
    const user = await this.validateUser(email, password);
    const payload = {
      firstName: email,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      role: user.role,
      userId: user.id,
      sub: {
        name: user.firstName,
      },
      expiresIn: this.configService.getOrThrow<string>('accessTokenExpiresIn'),
    };

    const accessToken = this.jwtService.signAsync(
      payload,
      this.configService.getOrThrow('jwt_secret'),
    );

    res.cookie('jwt-token', accessToken, {
      httpOnly: true, // accessible only by the web server
      secure: true, // https only
      sameSite: 'none', // cross site cookie
      maxAge: 45 * 60 * 1000, // cookie expiry: set to match accessToken (45 min)
    });

    // Create a refresh tokenn
    const refreshToken = this.jwtService.signAsync(
      {
        email: user.email,
        expiresIn: this.configService.getOrThrow<string>(
          'refreshTokenExpiresIn',
        ),
      },
      this.configService.getOrThrow('jwt_secret'),
    );

    res.cookie('jwt-token-refresh', refreshToken, {
      httpOnly: true, // accessible only by the web server
      secure: true, // https only
      sameSite: 'none', // cross site cookie
      maxAge: 1 * 24 * 60 * 60 * 1000, // cookie expiry: set to match refreshToken (1 days)
    });

    return {
      accessToken,
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
