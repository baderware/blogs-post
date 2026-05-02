import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

//for avoiding typoos for consistency, for setting here an getting it by the guard
export const ROLES_KEY = 'roles';
//this will add a metadata element --> ROLES_KEY i.e 'roles' : [roles] i.e ['ADMIN','USER'...] 
//...roles will allow multiple permissons i.e UserRole.ADMIN,UserRole.USER registered in the enums only.
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);