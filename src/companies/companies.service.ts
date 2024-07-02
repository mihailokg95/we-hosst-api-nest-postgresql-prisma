import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.prisma.company.create({ data: createCompanyDto });
  }

  async findAll(): Promise<Company[]> {
    return await this.prisma.company.findMany({
      include: { jobs: true, applications: true, locations: true },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.company.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.company.delete({ where: { id } });
  }
}
