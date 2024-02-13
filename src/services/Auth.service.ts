import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

import { LoginRequestDto } from '../dto/LoginRequest.dto';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { User } from '../entities/User.entity';
import { Role } from '../enums/Role.enum';
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

    async register(registerUserDto: RegisterUserDto) {
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
        user.roles = [Role.User];

        return await this.userService.save(user);
    }

    async login(loginRequest: LoginRequestDto): Promise<string> {
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

        return this.jwtService.signAsync({
            identifier: loginRequest.identifier
        });
    }
}
