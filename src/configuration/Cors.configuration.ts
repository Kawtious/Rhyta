import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const allowedOrigins: string[] = [
    'http://localhost:3001',
    'http://localhost:4000',
    'http://localhost:63342'
];

const allowedMethods: string[] = ['GET', 'PUT', 'POST', 'DELETE'];

export const CorsConfiguration: CorsOptions = {
    origin: allowedOrigins,
    methods: allowedMethods,
    credentials: true
};
