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
import AuthService from '../../main/services/AuthService';
import {User, UserRoles} from '../../main/models/User';
import {PasswordMismatchError} from "../../main/errors/PasswordMismatchError";
import {randomUUID} from "crypto";
import {EntityNotFoundError} from "../../main/errors/EntityNotFoundError";
import {JwtSecretGenerator} from "../../main/utils/JwtSecretGenerator";

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('dotenv');

jest.mock('../../main/repositories/UserRepository');

describe('AuthService', () => {
    const userRepository = require('../../main/repositories/UserRepository').userRepository;
    userRepository.save = jest.fn();
    userRepository.findOne = jest.fn();

    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    const mockUser = new User();
    mockUser.id = randomUUID();
    mockUser.username = 'user1';
    mockUser.email = 'user1@example.com';
    mockUser.password = 'hashedPassword';
    mockUser.roles = [UserRoles.User];

    const mockJwtSecret = JwtSecretGenerator.generate(64);
    const mockJwtExpiration = '1h';
    const mockToken = 'mockToken';

    beforeEach(() => {
        process.env.JWT_SECRET = mockJwtSecret;
        process.env.JWT_EXPIRATION = mockJwtExpiration;
    });

    describe('register', () => {
        it('should register a new user and return the user', async () => {
            userRepository.save.mockResolvedValue(mockUser);

            const result = await AuthService.register('user1', 'user1@example.com', 'password', [UserRoles.User]);

            expect(result).toEqual(mockUser);
        });
    });

    describe('login', () => {
        it('should log in a user and return a token', async () => {
            userRepository.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue(mockToken);

            const result = await AuthService.login('user1', 'password');

            expect(result).toEqual(mockToken);
        });

        it('should throw an EntityNotFoundError if the user does not exist', async () => {
            userRepository.findOne.mockResolvedValue(null);

            await expect(AuthService.login('nonexistent', 'password')).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw a PasswordMismatchError if the password does not match', async () => {
            userRepository.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            await expect(AuthService.login('user1', 'wrongPassword')).rejects.toThrow(PasswordMismatchError);
        });
    });
});
