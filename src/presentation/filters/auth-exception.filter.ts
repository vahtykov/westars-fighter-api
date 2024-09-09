import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof UnauthorizedException) {
      response.status(status).json({
        statusCode: status,
        message: 'Authentication failed',
        error: 'Unauthorized',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        error: exception.name,
      });
    }
  }
}