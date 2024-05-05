import { ApplicationStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  resume: string;
  @ApiProperty({
    type: 'string',
  })
  coverLetter: string;
  @ApiProperty({
    enum: ApplicationStatus,
  })
  status: ApplicationStatus;
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
