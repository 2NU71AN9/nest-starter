import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { HelloModule } from './module/hello/hello.module';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthController } from './module/auth/auth.controller';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './module/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { MyAuthGuard } from './common/guards/auth.guard';
import { RbacGuard } from './common/guards/rbac.guard';
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
    {
      provide: APP_GUARD,
      useClass: RbacGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({ path: 'hello', method: RequestMethod.POST })
    //   .forRoutes('users');
  }
}
