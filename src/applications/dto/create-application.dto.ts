import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateApplicationDto {
  @ApiProperty({
    type: 'string',
  })
  resume: string;
  @ApiProperty({
    type: 'string',
  })
  coverLetter: string;

  @ApiProperty({
    type: 'string',
  })
  job: Prisma.JobCreateNestedOneWithoutApplicationsInput;

  @ApiProperty({
    type: 'string',
  })
  applicant: Prisma.UserCreateNestedOneWithoutApplicationsInput;

  @ApiProperty({
    type: 'string',
  })
  company: Prisma.CompanyCreateNestedOneWithoutApplicationsInput;
}
