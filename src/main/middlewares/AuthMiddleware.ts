/*
 * MIT License
 *
 * Copyright (c) 2023 Usuario, Zeferito
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
import {NextFunction, Request, Response} from 'express';
import jwt, {Secret} from 'jsonwebtoken';
import {UserRoles} from '../models/User';
import HttpStatusCode from "../utils/HttpStatusCode";

const authMiddleware = (allowedRoles: UserRoles[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(HttpStatusCode.UNAUTHORIZED_401).json({error: 'Access denied. No token provided.'});
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(HttpStatusCode.UNAUTHORIZED_401).json({error: 'Access denied. No token provided.'});
        }

        const secret = process.env.JWT_SECRET as Secret;

        try {
            const decodedToken = jwt.verify(token, secret) as { username: string; roles: UserRoles[] };
            const userRoles = decodedToken.roles;
            const hasAllowedRole = userRoles.some((role) => allowedRoles.includes(role));

            if (!hasAllowedRole) {
                return res.status(HttpStatusCode.FORBIDDEN_403).json({error: 'Access denied. Insufficient permissions.'});
            }

            (<any>req).user = decodedToken;
            next();
        } catch (error) {
            return res.status(HttpStatusCode.UNAUTHORIZED_401).json({error: 'Invalid token.'});
        }
    };
};

export default authMiddleware;
