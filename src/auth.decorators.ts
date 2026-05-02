import { applyDecorators, UseGuards } from '@nestjs/common';
//import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './auth/role.guard';
import { Roles } from './auth/roles.decorators';
import { UserRole } from 'src/users/entities/user.entity';

//to avoid reptitve stuffs i just wrote this
//instead of 
//Roles(UserRole.USER...)
//UseGuards(JwtAuthGuard,RolesGuard)
//only Auth(UserRole:USER...)
export function Auth(...allowedRoles: UserRole[]) {
  return applyDecorators(
    Roles(...allowedRoles), // Mark the route with specific roles
    UseGuards(JwtAuthGuard, RolesGuard), // Run both "Who are you?" and "Can you do this?"
  );
}
