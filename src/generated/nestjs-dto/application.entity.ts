import { ApplicationStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './job.entity';
import { User } from './user.entity';
import { Company } from './company.entity';

export class Application {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  jobId: number;
  @ApiProperty({
    type: () => Job,
    required: false,
  })
  job?: Job;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  applicant?: User;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  applicantId: number;
  @ApiProperty({
    type: 'string',
  })
  resume: string;
  @ApiProperty({
    type: 'string',
  })
  coverLetter: string;
  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status: ApplicationStatus;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  companyId: number;
  @ApiProperty({
    type: () => Company,
    required: false,
  })
  company?: Company;
  @ApiProperty({
    type: () => User,
    isArray: true,
    required: false,
  })
  applicationsApplicant?: User[];
}
