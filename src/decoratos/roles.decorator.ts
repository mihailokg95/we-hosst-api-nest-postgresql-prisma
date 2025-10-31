import { Prisma } from '@prisma/client';

export enum UserRole {
  USER = 'USER',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}
import { SetMetadata } from '@nestjs/common';

const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);