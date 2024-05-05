import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  address?: string | null;
  @ApiProperty({
    type: 'string',
  })
  description: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  email?: string | null;
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
