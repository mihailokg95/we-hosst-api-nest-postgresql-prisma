import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    type: 'string',
  })
  address: string;
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
    required: false,
    nullable: true,
  })
  employerName?: string | null;
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
    required: false,
    nullable: true,
  })
  logo?: string | null;
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
}
