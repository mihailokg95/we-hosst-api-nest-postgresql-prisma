import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  age?: number | null;

  @ApiProperty({
    type: 'string',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
  })
  // @isStrongPassword({
  //   minLength: 8,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  @IsString()
  password: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  avatar?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  @IsArray()
  @IsOptional()
  bookmarks: number[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  applicationId: number[];
}
