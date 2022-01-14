/**
 * 捕获所有异常
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../../utils/log4js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.message : `${exception}`;

    const logFormat = ` Request original url: ${request.originalUrl}
  Method: ${request.method}
  IP: ${request.ip}
  Status code: ${status}
  Response: ${exception}  
  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
    Logger.error(logFormat);
    response.status(status).json({
      code: status,
      success: false,
      data: null,
      message,
      error: `${exception}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
