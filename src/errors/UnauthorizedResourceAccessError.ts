import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedResourceAccessError extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
