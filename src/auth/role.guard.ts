import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.entity';
import { ROLES_KEY } from './roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //  What roles are required for this specific route?
    //---getAllAndOverride--> if roles are defined on both the controller and the specific function, the function's roles take priority.
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, we let them through
    //if (!requiredRoles) return true;--->this one was añways returning false since [] is truthy which is sent when we use Auth()
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    //  Get the user from the request --attached by JwtAuthGuard(already decoded by it)--
    const { user } = context.switchToHttp().getRequest();

    // Check if the user has the required role
    
    //const hasRole = requiredRoles.some((role) => user.role?.includes(role));
    const hasRole = requiredRoles.includes(user.role);
    
    if (!hasRole) {
      throw new ForbiddenException(
        ' You do not have permission to access this resource',
      );
    }
    
    return true;
  }
}