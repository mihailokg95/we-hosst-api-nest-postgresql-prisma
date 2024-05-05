import { ApiProperty } from '@nestjs/swagger';

export class ConnectApplicationDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
}
