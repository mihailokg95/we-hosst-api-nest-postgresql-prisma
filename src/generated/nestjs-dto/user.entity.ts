import { NotificationsPreference, UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Application } from './application.entity';
import { Job } from './job.entity';
import { Company } from './company.entity';

export class User {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  firstName: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  lastName: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  age: number | null;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
  })
  password: string;
  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
  })
  role: UserRole;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  avatar: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  bookmarks: number[];
  @ApiProperty({
    type: () => Application,
    isArray: true,
    required: false,
  })
  applications?: Application[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  applicationId: number[];
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
    type: () => Job,
    isArray: true,
    required: false,
  })
  jobs?: Job[];
  @ApiProperty({
    isArray: true,
    enum: NotificationsPreference,
    enumName: 'NotificationsPreference',
  })
  notificationPreferences: NotificationsPreference[];
  @ApiProperty({
    type: () => Application,
    isArray: true,
    required: false,
  })
  applicationsApplicant?: Application[];
  @ApiProperty({
    type: () => Company,
    required: false,
    nullable: true,
  })
  company?: Company | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  companyId: number | null;
}
