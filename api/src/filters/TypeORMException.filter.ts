import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException
} from '@nestjs/common';

import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm/error/TypeORMError';

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = 500;
        const message = exception.message;

        response.status(status).json({
            statusCode: status,
            error: message,
            path: request.url
        });
    }
}
