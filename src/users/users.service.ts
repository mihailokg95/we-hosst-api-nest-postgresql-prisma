import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PaginateFunction, PaginatedResult, paginator } from 'src/paginator';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User | null> {
    return await this.prisma.user.create({
      data,
    });
  }

  async findAll({
    where,
    orderBy,
    page,
    limit,
  }: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<User[] | null>> {
    return await paginate(
      this.prisma.user,
      {
        where,
        orderBy,
        take: limit,
      },
      {
        page,
      },
    );
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUniqueOrThrow({ where: { email } });
  }

  async updateUser(params: {
    id: number;
    updateUserDto: UpdateUserDto;
  }): Promise<User | null> {
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
