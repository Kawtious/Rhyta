import { HttpException, HttpStatus } from '@nestjs/common';

export class UserConflictError extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.CONFLICT);
    }
}
