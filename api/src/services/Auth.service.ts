import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

import { JwtAuthResponseDto } from '../dto/JwtAuthResponse.dto';
import { UserLoginDto } from '../dto/UserLogin.dto';
import { UserSignInDto } from '../dto/UserSignIn.dto';
import { User } from '../entities/User.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { PasswordMismatchError } from '../errors/PasswordMismatchError';
import { UserConflictError } from '../errors/UserConflictError';
import { UserService } from './User.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerUserDto: UserSignInDto) {
        const existingUser = await this.userService.getByUsernameOrEmail(
            registerUserDto.username,
            registerUserDto.email
        );

        if (existingUser) {
            throw new UserConflictError(
                'A user already exists with the same username or email'
            );
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

        const user = new User();

        user.username = registerUserDto.username;
        user.email = registerUserDto.email;
        user.password = hashedPassword;

        return await this.userService.save(user);
    }

    async login(loginRequest: UserLoginDto): Promise<JwtAuthResponseDto> {
        const user = await this.userService.getByUsernameOrEmail(
            loginRequest.identifier,
            loginRequest.identifier
        );

        if (!user) {
            throw new EntityNotFoundError('User not found');
        }

        const passwordMatch = await bcrypt.compare(
            loginRequest.password,
            user.password
        );

        if (!passwordMatch) {
            throw new PasswordMismatchError('Invalid password');
        }

        const token = await this.jwtService.signAsync({
            identifier: loginRequest.identifier
        });

        return {
            accessToken: token,
            tokenType: 'Bearer'
        } as JwtAuthResponseDto;
    }
}
