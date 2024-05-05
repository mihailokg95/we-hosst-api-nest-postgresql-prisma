import { ApiProperty } from '@nestjs/swagger';

export class ConnectCompanyDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
}
