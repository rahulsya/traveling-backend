import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utils/roles';

export const ROLES_KEY = 'Role';
export const Access = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
