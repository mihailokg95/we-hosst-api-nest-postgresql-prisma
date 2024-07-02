import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
