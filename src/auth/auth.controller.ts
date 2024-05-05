import { UsersService } from '../users/users.service';
import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshJwtGuard } from './guards/refresh-auth.guard';
import * as argon2 from 'argon2';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
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
      return this.login(createUserDto);
    } catch (error: any) {
      return error.response;
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refresh(req.user);
  }

  async signout(req: Request, res: Response) {
    try {
      res.clearCookie('token');
      return res.send({ message: 'Successfully Logged Out' });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async hashPassword(password: string) {
    const hashed = await argon2.hash(password);
    return hashed;
  }
  async comparePassword(args: { password: string; hash: string }) {
    return await argon2.verify(args.hash, args.password);
  }
}
