import { HttpException, HttpStatus } from '@nestjs/common';

export class IdenticalEntityError extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.CONFLICT);
    }
}
