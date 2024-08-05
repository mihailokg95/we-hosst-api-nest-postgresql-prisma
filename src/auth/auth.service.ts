import { UsersService } from '../users/users.service';

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response, Request } from 'express';
import { ACCOUNT_NOT_FOUND, UNAUTHORIZED } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      // const foundUser = await this.userService.getUserByEmail(
      //   createUserDto.email,
      // );
      // if (foundUser) {
      //   throw new ConflictException('E-mail already in use');
      // }

      const user = await this.userService.createUser({
        ...createUserDto,
        email: createUserDto.email,
        password: await this.hashPassword(createUserDto.password),
        firstName: createUserDto.firstName,
      });
      console.log(user)
      if (!user) {
        throw new ForbiddenException('Could not create user');
      }
      return {user};
    } catch (error: any) {
      console.log(error)
      return error.response;
    }
  }

  async hashPassword(password: string) {
    const hashed = await argon2.hash(password);
    return hashed;
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User doesnt exist');
    }
    const verified = await argon2.verify(user.password, password);

    if (verified) {
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
      id: user.id,
      sub: {
        name: user.firstName,
      },
      expiresIn: this.configService.getOrThrow<string>('accessTokenExpiresIn'),
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('jwt_secret'),
    });

    res.cookie('jwt-token', accessToken, {
      httpOnly: true, // accessible only by the web server
      secure: true, // https only
      sameSite: 'none', // cross site cookie
      maxAge: 5 * 60 * 1000, // cookie expiry: set to match accessToken (5 min)
    });

    // Create a refresh token
    const refreshToken = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id
      },
      {
        expiresIn: this.configService.getOrThrow<string>(
          'refreshTokenExpiresIn',
        ),
        secret: this.configService.getOrThrow('jwt_secret'),
      },
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

  async refresh(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies['jwt-token-refresh']) {
      console.log("no jwt-token-refresh")
      return res.status(401).json({ message: UNAUTHORIZED });
    }

    const refreshToken = cookies['jwt-token-refresh'] as string;
    console.log("ref token from cookies is:", refreshToken)
    const verified = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.getOrThrow('jwt_secret'),
    });
    console.log("refresh token is verified: ", verified)
    if (!verified) {
      return res.status(401).json({ message: UNAUTHORIZED });
    }

    const { email } = this.jwtService.decode(refreshToken) as { email: string };

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: ACCOUNT_NOT_FOUND });
    }
    // Create a new access token
    const payload = {
      firstName: email,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      role: user.role,
      id: user.id,
      sub: {
        name: user.firstName,
      },
      expiresIn: this.configService.getOrThrow<string>('accessTokenExpiresIn'),
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('jwt_secret'),
    });

    res.cookie('jwt-token', accessToken, {
      httpOnly: true, // accessible only by the web server
      secure: true, // https only
      sameSite: 'none', // cross site cookie
      maxAge: 5 * 60 * 1000, // cookie expiry: set to match accessToken (15 minutes)
    });

    return res.json({ accessToken });
  }
}
