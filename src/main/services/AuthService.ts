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
import {EntityNotFoundError} from "../errors/EntityNotFoundError";
import {User, UserRoles} from '../models/User';
import bcrypt from 'bcrypt';
import jwt, {Secret} from 'jsonwebtoken';
import {PasswordMismatchError} from "../errors/PasswordMismatchError";
import {userRepository} from "../repositories/UserRepository";
import {randomUUID} from "crypto";

require('dotenv').config();

class AuthService {
    async register(username: string, email: string, password: string, roles: UserRoles[]) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user._id = randomUUID();
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.roles = roles;
        return await userRepository.save(user);
    }

    async login(identifier: string, password: string): Promise<string> {
        const user = await userRepository.findOne({
            where: {
                $or: [{username: identifier}, {email: identifier}]
            },
        });

        if (!user) {
            throw new EntityNotFoundError('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new PasswordMismatchError('Invalid password');
        }

        return this.generateToken(user.username, user.roles);
    }

    private generateToken(username: string, roles: UserRoles[]): string {
        return jwt.sign({username, roles}, process.env.JWT_SECRET as Secret, {expiresIn: process.env.JWT_EXPIRATION});
    }
}

export default new AuthService();
