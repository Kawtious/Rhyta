import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

import { Request } from 'express';

import { Permissions } from '../decorators/Permissions.decorator';
import { Permission } from '../entities/Role.entity';
import { User } from '../entities/User.entity';
import { UserService } from '../services/User.service';

@Controller({ path: 'users', version: '1' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getFromAuthHeader(@Req() request: Request): Promise<User> {
        return this.userService.getFromAuthHeader(request);
    }
}
