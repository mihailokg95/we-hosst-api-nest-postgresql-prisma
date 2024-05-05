import { ApiProperty } from '@nestjs/swagger';
import { Job } from './job.entity';
import { Company } from './company.entity';

export class Location {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobs?: Job[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
  })
  description: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  email: string | null;
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
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  pib: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    required: false,
  })
  company?: Company;
}
