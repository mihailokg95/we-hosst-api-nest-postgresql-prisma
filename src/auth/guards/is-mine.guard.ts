import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsMineGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 💡 We can access the user payload from the request object
    // because we assigned it in the AuthGuard
    console.log(
      'checking if its mine endpoint',
      parseInt(request.params.id) === request.user.sub,
    );
    return parseInt(request.params.id) === request.user.sub;
  }
}
