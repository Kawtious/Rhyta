import { HttpException, HttpStatus } from '@nestjs/common';

export class OptimisticLockingFailureError extends HttpException {
    constructor(
        message: string,
        expectedVersion: number,
        actualVersion: number
    ) {
        super(
            {
                message: message,
                expectedVersion: expectedVersion,
                actualVersion: actualVersion
            },
            HttpStatus.CONFLICT
        );
    }
}
