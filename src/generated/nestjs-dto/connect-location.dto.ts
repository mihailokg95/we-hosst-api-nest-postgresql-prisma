import { ApiProperty } from '@nestjs/swagger';

export class ConnectLocationDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
}
