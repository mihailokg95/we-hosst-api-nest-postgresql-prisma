import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

export class Company {
  id: number;
  address: string;
  applications: any[];
  jobs: any[];
  description: string;
  email: string;
  employerId: number;
  employerName: string | null;
  locations: any[];
  images: string[];
  managers: string[];
  socialNetworks: string[];
  name: string;
  logo: string | null;
  phone: string;
  zip: string;
  vat: string;
  crn: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
  members: any[];
}

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.prisma.company.create({ data: createCompanyDto });
  }

  async findAll(): Promise<Company[]> {
    return await this.prisma.company.findMany({
      include: { jobs: true, applications: true, locations: true },
    }) as any;
  }

  async findOneById(id: number) {
    return await this.prisma.company.findUniqueOrThrow({
      where: { id },
      include: { jobs: true, applications: true, locations: true },
    });
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
