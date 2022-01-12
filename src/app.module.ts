import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { HelloModule } from './hello/hello.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { MyAuthGuard } from './common/guards/auth.guard';
@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    HelloModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
