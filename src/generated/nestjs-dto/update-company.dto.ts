import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  address?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  description?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  email?: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  employerId?: number;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  employerName?: string | null;
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
  })
  images?: string[];
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
  })
  managers?: string[];
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
  })
  socialNetworks?: string[];
  @ApiProperty({
    type: 'string',
    required: false,
  })
  name?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  logo?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  phone?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  zip?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  vat?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  crn?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  website?: string;
}
