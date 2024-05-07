import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string, res: Response) {
    res.clearCookie('jwt-token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    // Clear cookies
    res.clearCookie('jwt-token-refresh', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return this.usersService.deleteUser(+id);
  }
}
