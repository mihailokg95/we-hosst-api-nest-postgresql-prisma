import { ApiProperty } from '@nestjs/swagger';

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
  socialNetworks?: string[];
  companyId: number;
}
