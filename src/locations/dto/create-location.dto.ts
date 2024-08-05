import { ApiProperty } from '@nestjs/swagger';
import { Company } from '@prisma/client';

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
