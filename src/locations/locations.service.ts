import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}
  async create(createLocationDto: CreateLocationDto) {
    return await this.prisma.location.create({ data: createLocationDto });
  }

  async findAll() {
    return await this.prisma.location.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.location.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    return await this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.location.delete({ where: { id } });
  }
}
