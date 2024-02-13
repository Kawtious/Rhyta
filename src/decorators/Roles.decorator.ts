import { HttpStatus, SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { Role } from '../enums/Role.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) =>
    applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        ApiBearerAuth('JWT-auth'),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: 'Access denied. No valid token provided'
        })
    );
