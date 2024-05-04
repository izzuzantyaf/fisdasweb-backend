import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { info?: any }>();
    const response = context.switchToHttp().getResponse<Response>();

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
