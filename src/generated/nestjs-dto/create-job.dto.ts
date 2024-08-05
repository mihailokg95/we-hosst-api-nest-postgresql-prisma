import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  employerName?: string | null;
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
}
