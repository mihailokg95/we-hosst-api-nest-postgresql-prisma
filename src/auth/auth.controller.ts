import { UsersService } from '../users/users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response, Request as ExpressRequest } from 'express';
import { UNAUTHORIZED } from 'src/constants';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decoratos/public.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(loginDto, res);
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  /**
   * Asynchronously refreshes the authentication token.
   *
   * @param {@Request()} req - The Express request object.
   * @param {@Res()} res - The Express response object.
   * @return {Promise<void>} A promise that resolves when the authentication token is refreshed.
   */
  @Public()
  @Get('refresh')
  async refresh(
    @Request() req: ExpressRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return this.authService.refresh(req, res);
  }

  /**
   * @desc    Logout
   * @route   POST /auth/logout
   * @access  PUBLIC - just to clear cookies if exist
   */
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req: ExpressRequest, @Res() res: Response) {
    try {
      if (!req.cookies['jwt-token-refresh']) {
        return res.status(401).json({ message: UNAUTHORIZED });
      }
      res.clearCookie('jwt-token-refresh', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.clearCookie('jwt-token', {
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
