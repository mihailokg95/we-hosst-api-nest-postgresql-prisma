import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto {
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
  })
  images?: string[];
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  category?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  description?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  concept?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  phone?: string | null;
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
  })
  socialNetworks?: string[];
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  email?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  numberOfEmployees?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  address?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  zip?: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  employerId?: number;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  city?: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
  })
  managers?: string[];
  @ApiProperty({
    type: 'string',
    required: false,
  })
  country?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  logo?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  employerName?: string | null;
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
  vat?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  kitchenConcept?: string | null;
}
