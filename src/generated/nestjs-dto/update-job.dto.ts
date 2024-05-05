import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  employerName?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  title?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  description?: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
    required: false,
  })
  requirements?: string[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
    required: false,
  })
  applicationId?: number[];
}
