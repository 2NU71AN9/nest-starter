"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const nestjs_config_1 = require("nestjs-config");
const hello_module_1 = require("./module/hello/hello.module");
const auth_controller_1 = require("./module/auth/auth.controller");
const auth_module_1 = require("./module/auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./module/users/users.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./common/guards/auth.guard");
const rbac_guard_1 = require("./common/guards/rbac.guard");
const serve_static_1 = require("@nestjs/serve-static");
let AppModule = class AppModule {
    configure(consumer) {
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_config_1.ConfigModule.load((0, path_1.resolve)(__dirname, 'config', '**/!(*.d).{ts,js}')),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (config) => config.get('database'),
                inject: [nestjs_config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            hello_module_1.HelloModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.MyAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: rbac_guard_1.RbacGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map