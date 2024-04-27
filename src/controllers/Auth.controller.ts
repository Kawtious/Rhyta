import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { JwtAuthResponseDto } from '../dto/JwtAuthResponse.dto';
import { UserLoginDto } from '../dto/UserLogin.dto';
import { UserSignInDto } from '../dto/UserSignIn.dto';
import { AuthService } from '../services/Auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() userSignInDto: UserSignInDto) {
        return await this.authService.register(userSignInDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userLoginDto: UserLoginDto) {
        const token = await this.authService.login(userLoginDto);

        return {
            accessToken: token,
            tokenType: 'Bearer'
        } as JwtAuthResponseDto;
    }
}
