import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  resume?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  coverLetter?: string;
}
