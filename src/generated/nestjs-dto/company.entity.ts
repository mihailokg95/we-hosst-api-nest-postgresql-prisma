import { ApiProperty } from '@nestjs/swagger';
import { Application } from './application.entity';
import { Job } from './job.entity';
import { Location } from './location.entity';
import { User } from './user.entity';

export class Company {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  address: string;
  @ApiProperty({
    type: () => Application,
    isArray: true,
    required: false,
  })
  applications?: Application[];
  @ApiProperty({
    type: () => Job,
    isArray: true,
    required: false,
  })
  jobs?: Job[];
  @ApiProperty({
    type: 'string',
  })
  description: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  employerId: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  employerName: string | null;
  @ApiProperty({
    type: () => Location,
    isArray: true,
    required: false,
  })
  locations?: Location[];
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  images: string[];
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  managers: string[];
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  socialNetworks: string[];
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  logo: string | null;
  @ApiProperty({
    type: 'string',
  })
  phone: string;
  @ApiProperty({
    type: 'string',
  })
  zip: string;
  @ApiProperty({
    type: 'string',
  })
  vat: string;
  @ApiProperty({
    type: 'string',
  })
  crn: string;
  @ApiProperty({
    type: 'string',
  })
  website: string;
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
    type: () => User,
    isArray: true,
    required: false,
  })
  members?: User[];
}
