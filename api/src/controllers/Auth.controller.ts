import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Permissions } from '../decorators/Permissions.decorator';
import { UserLoginDto } from '../dto/UserLogin.dto';
import { UserSignInDto } from '../dto/UserSignIn.dto';
import { Permission } from '../enums/Permission.enum';
import { AuthService } from '../services/Auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async register(@Body() userSignInDto: UserSignInDto) {
        return await this.authService.register(userSignInDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userLoginDto: UserLoginDto) {
        return await this.authService.login(userLoginDto);
    }
}
