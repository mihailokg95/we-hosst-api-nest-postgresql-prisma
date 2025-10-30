import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';
import { paginator, PaginateOptions } from 'src/paginator';
import { Prisma } from '@prisma/client';
import { Job } from 'src/generated/nestjs-dto/job.entity';

@Injectable()
export class JobsService {
  private paginate: ReturnType<typeof paginator>;
  constructor(private prisma: PrismaService) {
    this.paginate = paginator({ page: 1, perPage: 10 });
  }
  async create(createJobDto: CreateJobDto) {
    return await this.prisma.job.create({ data: createJobDto });
  }

  async findAll(options?: PaginateOptions) {
    return await this.paginate<Job, Prisma.JobFindManyArgs>(this.prisma.job, {}, options);
  }
  async getEmployerJobs(id: number, options?: PaginateOptions) {
    return await this.paginate<Job, Prisma.JobFindManyArgs>(
      this.prisma.job,
      { where: { employerId: id } },
      options,
    );
  }

  async getApplicationsForAllJobs(id: number, options?: PaginateOptions) {
    return await this.paginate<Job, Prisma.JobFindManyArgs>(
      this.prisma.job,
      {
        where: { employerId: id },
        select: { applications: true },
      },
      options,
    );
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
