import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordMismatchError extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
