import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AppError } from '../utils/app_error';


const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = err.statusCode | httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || 'Something went wrong!';
    let error = err;

    if (err instanceof AppError) {
        message = err?.message;
        statusCode = err?.statusCode;
        error = err?.stack;
    }

    res.status(statusCode).json({
        success,
        message,
        error,
    });
};

export default globalErrorHandler;