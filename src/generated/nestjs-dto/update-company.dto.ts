import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
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
  description?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  email?: string | null;
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
  employerName?: string;
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
  phone?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  pib?: string | null;
}
