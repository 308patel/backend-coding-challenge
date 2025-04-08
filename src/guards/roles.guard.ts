// roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
      if (!requiredRoles) {
        return true; // If no roles are specified, allow access
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user; // Assuming user is attached to the request
  

      if (!user || !user.role) {
        throw new ForbiddenException('Access denied');
      }
      // const hasRole = () => user.role.some((role: Role) => requiredRoles.includes(role));
        const hasRole = () => requiredRoles.includes(user.role);

      if (!hasRole()) {
        throw new ForbiddenException('Access denied');
      }
  
      return true;
    }
  }