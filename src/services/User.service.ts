/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious, Zeferito
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Request, request } from 'express';
import { DeleteResult, Repository } from 'typeorm';

import { User } from '../entities/User.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { TokenVerificationError } from '../errors/TokenVerificationError';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User, 'mySqlConnection')
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id: id },
            select: ['id', 'username', 'password', 'roles']
        });

        if (!user) {
            throw new EntityNotFoundError('User not found');
        }

        return user;
    }

    async getByUsernameOrEmail(
        username: string,
        email: string
    ): Promise<User | null> {
        return await this.userRepository.findOne({
            where: [{ username: username }, { email: email }],
            select: ['id', 'username', 'password', 'roles']
        });
    }

    async getByJwtToken(token: string): Promise<User> {
        let decodedToken;

        try {
            decodedToken = (await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET')
            })) as {
                identifier: string;
            };
        } catch (error: any) {
            throw new TokenVerificationError(error.message);
        }

        const identifier = decodedToken.identifier;

        const user = await this.userRepository.findOne({
            where: [{ username: identifier }, { email: identifier }],
            select: ['id', 'username', 'password', 'roles']
        });

        if (!user) {
            throw new EntityNotFoundError('User not found');
        }

        return user;
    }

    async getFromAuthHeader(request: Request): Promise<User> {
        const authHeader = request.header('Authorization');

        if (!authHeader) {
            throw new TokenVerificationError(
                'Access denied. No token provided.'
            );
        }

        const token = authHeader.split(' ')[1];

        return this.getByJwtToken(token);
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
