import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(req: Request & { info?: any }, res: Response, next: NextFunction) {
    req.info = {
      id: Date.now().toString(),
      ip: req.ip,
      'user-agent': req.headers['user-agent'],
    };
    this.logger.log(
      `Request ${req.method} ${req.path} ${JSON.stringify(req.info)}`,
    );
    next();
  }
}
