import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObject = exceptionResponse as {
          message?: string | string[];
        };

        if (Array.isArray(responseObject.message)) {
          message = responseObject.message.join(', ');
        } else if (typeof responseObject.message === 'string') {
          message = responseObject.message;
        }
      }
    }

    response.status(status).json({
      success: false,

      statusCode: status,

      timestamp: new Date().toISOString(),

      path: request.url,

      message,
    });
  }
}
