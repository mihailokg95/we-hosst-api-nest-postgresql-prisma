import { NotificationsPreference } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  firstName?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  lastName?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  age?: number | null;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  email?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  password?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  avatar?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
    required: false,
  })
  bookmarks?: number[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
    required: false,
  })
  applicationId?: number[];
  @ApiProperty({
    isArray: true,
    enum: NotificationsPreference,
    required: false,
  })
  notificationPreferences?: NotificationsPreference[];
}
