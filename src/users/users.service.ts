import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

export class User {
  id: number;
  firstName: string;
  lastName: string | null;
  age: number | null;
  email: string;
  password: string;
  role: any;
  avatar: string | null;
  bookmarks: number[];
  applications: any[];
  applicationId: number[];
  createdAt: Date;
  updatedAt: Date;
  jobs: any[];
  notificationPreferences: any[];
  applicationsApplicant: any[];
  company: any | null;
  companyId: number | null;
}
import { PaginateFunction, PaginatedResult, paginator } from 'src/paginator';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User | null> {
    return await this.prisma.user.create({
      data,
    }) as any;
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
    }) as any;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { email } }) as any;
  }

  async updateUser(params: {
    id: number;
    updateUserDto: UpdateUserDto;
  }): Promise<User | null> {
    const { id, updateUserDto } = params;
    return this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    }) as any;
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    }) as any;
  }

  async getBookmarkedJobs(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const ids = Array.isArray((user as any).bookmarks) ? (user as any).bookmarks : [];
    if (!ids.length) {
      return { total: 0, jobs: [] };
    }
    const jobs = await this.prisma.job.findMany({ where: { id: { in: ids } } });
    return { total: jobs.length, jobs } as any;
  }

  async bookmarkJob(userId: number, jobId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const current: number[] = Array.isArray((user as any).bookmarks) ? (user as any).bookmarks : [];
    const next = current.includes(jobId) ? current : [...current, jobId];
    await this.prisma.user.update({ where: { id: userId }, data: { bookmarks: next } });
    return { message: 'Bookmarked' };
  }

  async getApplications(userId: number) {
    const applications = await this.prisma.application.findMany({
      where: { applicantId: userId },
      include: { job: true },
    });
    const mapped = applications.map((a: any) => ({
      jobId: a.jobId,
      applicantId: a.applicantId,
      resume: a.resume,
      coverLetter: a.coverLetter,
      status: a.status,
      applicationId: a.id,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
      job: a.job,
    }));
    return { total: mapped.length, applications: mapped } as any;
  }

  async applyToJob(userId: number, jobId: number, params: { resume: string; coverLetter: string }) {
    await this.prisma.application.create({
      data: {
        job: { connect: { id: jobId } },
        applicant: { connect: { id: userId } },
        company: { connect: { id: (await this.prisma.job.findUniqueOrThrow({ where: { id: jobId } })).companyId } },
        resume: params.resume,
        coverLetter: params.coverLetter,
      },
    });
    return { message: 'Application submitted' };
  }
}
