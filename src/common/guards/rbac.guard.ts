import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string[]>('role', context.getHandler());
    console.log('role =>', role);
    if (role === undefined) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.role > role) {
      throw new ForbiddenException('对不起，您无权操作');
    }
    return true;
  }
}
