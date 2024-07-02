import { UserRole } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';

const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);