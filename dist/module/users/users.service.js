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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entites/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository, connection) {
        this.usersRepository = usersRepository;
        this.connection = connection;
    }
    findAll() {
        return this.usersRepository.find({ relations: ['photos'] });
    }
    async findUserWithId(id) {
        return await this.usersRepository.findOne({ where: { id } });
    }
    async create(user) {
        const { username } = user;
        const u = await this.usersRepository.findOne({ where: { username } });
        if (u) {
            throw new common_1.HttpException({ message: '该用户已注册', error: '该用户已注册' }, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.usersRepository.save(user);
    }
    async createMany(users) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            users.forEach(async (user) => {
                await queryRunner.manager.getRepository(user_entity_1.User).save(user);
            });
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return false;
        }
        finally {
            await queryRunner.release();
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map