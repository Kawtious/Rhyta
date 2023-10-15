/*
 * MIT License
 * 
 * Copyright (c) 2023 Kawtious, Zeferito
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {Request, Response} from 'express';
import HttpStatusCode from "../utils/HttpStatusCode";
import AuthService from "../services/AuthService";

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const {username, email, password, roles} = req.body;
            const user = await AuthService.register(username, email, password, roles);

            return res.status(HttpStatusCode.CREATED_201).json(user);
        } catch (error: any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500).json({error: 'Error registering user: ' + error.message});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {identifier, password} = req.body;
            const token = await AuthService.login(identifier, password);

            if (!token) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500).json({error: 'Failed to create token'});
            }

            return res.status(HttpStatusCode.OK_200).json({accessToken: token, tokenType: 'Bearer'});
        } catch (error: any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500).json({error: 'Error logging user in: ' + error.message});
        }
    }
}

export default AuthController;
