import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(params: {
    id: number;
    updateUserDto: UpdateUserDto;
  }): Promise<User> {
    const { id, updateUserDto } = params;
    return this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
