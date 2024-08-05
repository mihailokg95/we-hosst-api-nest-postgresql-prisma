import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  employerName: string | null;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  description: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  requirements: string[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  applicationId: number[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
