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
    async register(@Body() registerUserDto: UserSignInDto) {
        return await this.authService.register(registerUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginRequest: UserLoginDto) {
        const token = await this.authService.login(loginRequest);

        return {
            accessToken: token,
            tokenType: 'Bearer'
        } as JwtAuthResponseDto;
    }
}
