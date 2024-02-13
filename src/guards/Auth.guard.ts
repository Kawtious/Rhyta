import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';

import { ROLES_KEY } from '../decorators/Roles.decorator';
import { Role } from '../enums/Role.enum';
import { UserService } from '../services/User.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const req: Request = context.switchToHttp().getRequest();

        const user = await this.userService.getFromAuthHeader(req);

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}
