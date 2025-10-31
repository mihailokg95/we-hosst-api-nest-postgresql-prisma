import { Prisma } from '@prisma/client';

export enum UserRole {
  USER = 'USER',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  firstName: string;
  @ApiProperty({
    type: 'string',
  })
  lastName: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  age: number | null;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
  })
  password: string;
  @ApiProperty({
    enum: UserRole,
  })
  role: UserRole;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  avatar: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  bookmarks: number[];
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
