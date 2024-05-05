import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Application } from 'src/generated/nestjs-dto/application.entity';
import { Job } from 'src/generated/nestjs-dto/job.entity';

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
  })
  lastName: string;
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
    isArray: true,
    required: false,
  })
  jobs?: Job[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  applicationsApplicant?: Application[];
}
