import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}
  create(createApplicationDto: CreateApplicationDto) {
    return this.prisma.application.create({ data: createApplicationDto });
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return console.log(id, updateApplicationDto);
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }

  //
  // async findApplicationsByJobs(jobIds: string[]): Promise<Application[]> {
  //   return await this.prisma.application.findMany({
  //     where: { jobId: { in: jobIds } },
  //     include: { user: true }, // Include user data
  //   });
  // }

  // async getApplicationStatusDistribution(
  //   applications: Application[],
  // ): Promise<{ name: string; count: number }[]> {
  //   const statusDistribution = {
  //     Applied: 0,
  //     Viewed: 0,
  //     Rejected: 0,
  //   };

  //   applications.forEach((application) => {
  //     statusDistribution[application.status] += 1;
  //   });

  //   return Object.entries(statusDistribution).map(([name, count]) => ({
  //     name,
  //     count,
  //   }));
  // }

  // async getApplicationTrends(
  //   jobIds: string[],
  //   startDate: Date,
  //   endDate: Date,
  // ): Promise<{ date: string; applications: number }[]> {
  //   const applicationTrends = await this.prisma.application.aggregate({
  //     _aggregate: true,
  //     count: true,
  //     where: {
  //       jobId: { in: jobIds },
  //       createdAt: { gte: startDate, lte: endDate },
  //     },
  //     groupBy: {
  //       date: {
  //         function: 'date',
  //         field: 'createdAt',
  //       },
  //     },
  //   });

  //   return applicationTrends.map((trend) => ({
  //     date: trend.date.toString(),
  //     applications: trend.count,
  //   }));
  // }
}
