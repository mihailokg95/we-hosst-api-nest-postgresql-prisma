import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Company {
  id: number;
  address: string;
  applications: any[];
  jobs: any[];
  description: string;
  email: string;
  employerId: number;
  employerName: string | null;
  locations: any[];
  images: string[];
  managers: string[];
  socialNetworks: string[];
  name: string;
  logo: string | null;
  phone: string;
  zip: string;
  vat: string;
  crn: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
  members: any[];
}

export class CreateLocationDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    type: 'string',
  })
  description: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  email: string | null;
  @ApiProperty({
    type: 'string',
  })
  employerName?: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  phone: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  vat: string | null;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
    required: false,
  })
  @ApiProperty()
  socialNetworks?: string[];
  @ApiProperty({
    type: 'number',})
  public companyId: never;
  @ApiProperty()
  numberOfEmployees?: string;
  @ApiProperty()
  zip: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  company: any;
  @ApiProperty()
  public employerId: number;
}
