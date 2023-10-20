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
require('dotenv').config();

import axios, {AxiosInstance} from 'axios';

const apiUrl = process.env.API_BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let authToken: string | null = 'YOUR_INITIAL_BEARER_TOKEN';

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

export function updateAuthToken(newToken: string) {
    authToken = newToken;
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
}