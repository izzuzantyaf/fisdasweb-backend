import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';

export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { info?: any }>();
    const response = context.switchToHttp().getResponse<Response>();

    request.info = {
      id: Date.now().toString(),
      ip: request.ip,
      'user-agent': request.headers['user-agent'],
      // body: request.body,
    };
    this.logger.log(
      `Request ${request.method} ${request.path} ${JSON.stringify(request.info)}`,
    );

    // delete request.info.body;
    return next.handle().pipe(
      map((responseData) => {
        this.logger.log(
          `Response ${response.statusCode} ${request.method} ${
            request.url
          } ${JSON.stringify(request.info)}`,
        );
        return responseData;
      }),
    );
  }
}
