import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
  async create(createJobDto: CreateJobDto) {
    return await this.prisma.job.create({ data: createJobDto });
  }

  async findAll() {
    return await this.prisma.job.findMany();
  }
  async getEmployerJobs(id: number) {
    return await this.prisma.job.findMany({
      where: { employerId: id },
    });
  }

  async getApplicationsForAllJobs(id: number) {
    return await this.prisma.job.findMany({
      where: { employerId: id },
      select: { applications: true },
    });
  }
  async findOne(id: number) {
    return await this.prisma.job.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    return await this.prisma.job.update({ where: { id }, data: updateJobDto });
  }

  async remove(id: number) {
    return await this.prisma.job.delete({ where: { id } });
  }
}
