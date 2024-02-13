import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { User } from '../entities/User.entity';
import { UserService } from '../services/User.service';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get user data from authorization header',
        description: "Get a user's data through the authorization header."
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'User data' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'User is not valid and must reauthenticate'
    })
    async getFromAuthHeader(@Req() request: Request): Promise<User> {
        return this.userService.getFromAuthHeader(request);
    }
}
