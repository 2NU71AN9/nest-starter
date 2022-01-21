"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hello_service_1 = require("./hello.service");
const hello_1 = require("./classes/hello");
let HelloController = class HelloController {
    constructor(helloService) {
        this.helloService = helloService;
    }
    fetch({ id }, token) {
        console.log(id, token);
        return this.helloService.fetch(id);
    }
    save({ name }) {
        console.log(name);
        return this.helloService.save(name);
    }
    edit(id, { name }) {
        console.log('id类型=>', typeof id);
        return this.helloService.edit(id, name);
    }
    delete({ id }) {
        return this.helloService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'role', enum: hello_1.UserRole }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '哈哈哈哈',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], HelloController.prototype, "fetch", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ description: '输入name' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], HelloController.prototype, "save", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiBody)({ description: '输入name' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], HelloController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], HelloController.prototype, "delete", null);
HelloController = __decorate([
    (0, swagger_1.ApiTags)('hello'),
    (0, common_1.Controller)('hello'),
    __metadata("design:paramtypes", [hello_service_1.HelloService])
], HelloController);
exports.HelloController = HelloController;
//# sourceMappingURL=hello.controller.js.map