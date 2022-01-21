"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const transform_interceptor_1 = require("./common/interceptor/transform.interceptor");
const any_exception_filter_1 = require("./common/filters/any-exception.filter");
const fs = require("fs");
const path = require("path");
const validation_pipe_1 = require("./common/pipe/validation.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn'],
    });
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('nest-starter api document')
        .setDescription('nest-starter api document description')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    fs.writeFileSync(path.join(__dirname, '../public/swagger-spec.json'), JSON.stringify(document));
    swagger_1.SwaggerModule.setup('doc', app, document);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger_middleware_1.logger);
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new any_exception_filter_1.AllExceptionsFilter());
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    await app.listen(80);
}
bootstrap();
//# sourceMappingURL=main.js.map