import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 异常过滤器

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log('exception=>', exception);
    const exceptionRes: any = exception.getResponse();
    const { error, message } = exceptionRes;
    response.status(status).json({
      status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
