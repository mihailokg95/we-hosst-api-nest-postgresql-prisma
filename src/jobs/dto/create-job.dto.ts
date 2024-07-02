import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  employerName: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  @IsArray()
  requirements: string[];

  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  location: Prisma.LocationCreateNestedOneWithoutJobsInput;
  company: Prisma.CompanyCreateNestedOneWithoutJobsInput;
  employer: Prisma.UserCreateNestedOneWithoutJobsInput;
  applicationId: number[];
}
