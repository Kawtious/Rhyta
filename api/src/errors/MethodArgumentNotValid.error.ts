import { HttpException, HttpStatus } from '@nestjs/common';

export class MethodArgumentNotValidError extends HttpException {
    constructor(message: string, data: Record<any, any>) {
        super({ message: message, data: data }, HttpStatus.BAD_REQUEST);
    }
}
