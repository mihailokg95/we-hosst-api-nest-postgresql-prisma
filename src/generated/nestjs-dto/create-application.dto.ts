import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({
    type: 'string',
  })
  resume: string;
  @ApiProperty({
    type: 'string',
  })
  coverLetter: string;
}
