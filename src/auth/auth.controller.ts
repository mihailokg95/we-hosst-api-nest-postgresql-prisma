import { UsersService } from '../users/users.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshJwtGuard } from './guards/refresh-auth.guard';
import { Response, Request as ExpressRequest } from 'express';
import { UNAUTHORIZED } from 'src/constants';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, res: Response) {
    return await this.authService.login(loginDto, res);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, res: Response) {
    return await this.authService.register(createUserDto, res);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrsh(@Request() req) {
    return this.authService.refresh(req.user);
  }

  /**
   * @desc    Logout
   * @route   POST /auth/logout
   * @access  PUBLIC - just to clear cookies if exist
   */
  async logout(req: ExpressRequest, res: Response) {
    if (!req.cookies['jwt-token-refresh']) {
      return res.status(401).json({ message: UNAUTHORIZED });
    }
    try {
      res.clearCookie('jwt-token-refresh', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.send({ message: 'Successfully Logged Out' });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
