import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export enum UserRole {
  USER = 'USER',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

@Injectable()
export class Guard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean>  {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])
    if (requiredRoles && requiredRoles.length === 0) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("roles guard result is: ", user && requiredRoles.some(role => user.role.includes(role)));
    return user && requiredRoles.some(role => user.role.includes(role))
  }
}