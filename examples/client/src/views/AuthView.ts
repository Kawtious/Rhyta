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
import readlineSync from 'readline-sync';
import { axiosInstance, updateAuthToken } from '../configuration/AxiosConfig';

class AuthView {
    private readonly authEndpoint: string;

    constructor(careerEndpoint: string) {
        this.authEndpoint = careerEndpoint;
    }

    async show() {
        while (true) {
            console.log('\nAuth CLI');
            console.log('1. Register User');
            console.log('2. Login User');
            console.log('0. Return');

            const choice = readlineSync.question('Enter your choice: ');

            switch (choice) {
                case '1':
                    await this.registerUser();
                    break;
                case '2':
                    await this.loginUser();
                    break;
                case '0':
                    return;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        }
    }

    private async registerUser() {
        const username = readlineSync.question('Enter Username: ');
        const email = readlineSync.question('Enter Email: ');
        const password = readlineSync.question('Enter Password: ');
        const rolesInput = readlineSync.question(
            'Enter roles (separated by spaces): '
        );
        const roles = rolesInput.split(' ');

        try {
            const response = await axiosInstance.post(
                `/${this.authEndpoint}/register`,
                {
                    username,
                    email,
                    password,
                    roles
                }
            );
            console.log('\nRegistered User:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError registering user:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async loginUser() {
        const identifier = readlineSync.question('Enter Username or Email: ');
        const password = readlineSync.question('Enter Password: ');

        try {
            const response = await axiosInstance.post(
                `/${this.authEndpoint}/login`,
                {
                    identifier,
                    password
                }
            );
            console.log('\nUser logged in:');
            console.log(response.data);

            updateAuthToken(response.data.accessToken);
            console.log('\nUpdated Authorization header:');
            console.log(axiosInstance.defaults.headers.common['Authorization']);
        } catch (error: any) {
            console.error('\nError logging user in:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }
}

export default AuthView;
