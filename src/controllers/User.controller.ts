import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

import { Request } from 'express';

import { Roles } from '../decorators/Roles.decorator';
import { User } from '../entities/User.entity';
import { Role } from '../enums/Role.enum';
import { UserService } from '../services/User.service';

@Controller({ path: 'users', version: '1' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getFromAuthHeader(@Req() request: Request): Promise<User> {
        return this.userService.getFromAuthHeader(request);
    }
}
