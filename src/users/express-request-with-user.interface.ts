import { UserDto } from './dto/user.dto';
import { Request as ExpressRequest } from 'express';

export interface ExpressRequestWithUser extends ExpressRequest {
  user: UserDto & { iat: number; exp: number };
}
