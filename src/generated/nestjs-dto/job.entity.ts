import { ApiProperty } from '@nestjs/swagger';
import { Application } from './application.entity';
import { Location } from './location.entity';
import { Company } from './company.entity';
import { User } from 'src/users/entities/user.entity';

export class Job {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    required: false,
  })
  employer?: User;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  employerId: number;
  @ApiProperty({
    type: 'string',
  })
  employerName: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  description: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  requirements: string[];
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
  applications?: Application[];
  @ApiProperty({
    required: false,
  })
  location?: Location;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  locationId: number;
  @ApiProperty({
    required: false,
  })
  company?: Company;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  companyId: number;
}
