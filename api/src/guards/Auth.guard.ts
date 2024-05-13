import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';

import { PERMISSIONS_KEY } from '../decorators/Permissions.decorator';
import { Permission } from '../entities/Role.entity';
import { UserService } from '../services/User.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<
            Permission[]
        >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

        if (!requiredPermissions) {
            return true;
        }

        const req: Request = context.switchToHttp().getRequest();

        const user = await this.userService.getFromAuthHeader(req);

        const hasPermission: boolean = requiredPermissions.some((permission) =>
            user.permissions?.includes(permission)
        );

        const hasRoleWithPermission: boolean = requiredPermissions.some(
            (permission) =>
                user.roles?.some((role) =>
                    role?.permissions.includes(permission)
                )
        );

        return hasPermission || hasRoleWithPermission;
    }
}
