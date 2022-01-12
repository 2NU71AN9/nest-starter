import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [HelloModule, AuthModule],
  controllers: [AuthController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
