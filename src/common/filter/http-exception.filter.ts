import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ACCESS_TOKEN_NAME } from 'src/auth/constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { info?: any }>();
    const status = exception.getStatus();

    this.logger.log(
      `Response ${status} ${request.method} ${request.url} ${JSON.stringify(request.info)}`,
    );

    if (status === HttpStatus.UNAUTHORIZED) {
      return response.clearCookie(ACCESS_TOKEN_NAME).status(status).json({
        message: 'Unauthorized',
        data: null,
      });
    }

    response.status(status).json(exception.getResponse());
  }
}
