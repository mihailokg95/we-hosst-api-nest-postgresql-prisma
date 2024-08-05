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
    isArray: true,
  })
  images: string[];
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  category: string | null;
  @ApiProperty({
    type: 'string',
  })
  description: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  concept: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  socialNetworks: string[];
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  email: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  numberOfEmployees: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    type: 'string',
  })
  zip: string;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobs?: Job[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  employerId: number;
  @ApiProperty({
    type: 'string',
  })
  city: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  managers: string[];
  @ApiProperty({
    type: 'string',
  })
  country: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  logo: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  employerName: string | null;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  vat: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  kitchenConcept: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  Company?: Company | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  companyId: number | null;
}
