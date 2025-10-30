import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Application } from './application.entity';
import { Location } from './location.entity';
import { Company } from './company.entity';

export class Job {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: () => User,
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
    nullable: true,
  })
  employerName: string | null;
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
    type: () => Application,
    isArray: true,
    required: false,
  })
  applications?: Application[];
  @ApiProperty({
    type: () => Location,
    required: false,
  })
  location?: Location;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  locationId: number;
  @ApiProperty({
    type: () => Company,
    required: false,
  })
  company?: Company;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  companyId: number;
}
