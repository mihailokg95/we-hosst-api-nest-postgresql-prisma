import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  images: string[];
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  category?: string | null;
  @ApiProperty({
    type: 'string',
  })
  description: string;
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
  })
  socialNetworks: string[];
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
  })
  zip: string;
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
  })
  name: string;
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
