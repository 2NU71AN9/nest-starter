import { RegisterInfoDTO } from './user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(req: any): any;
    findAll({ page, size }: {
        page: any;
        size: any;
    }): Promise<import("../../entites/user.entity").User[]>;
    regist(body: RegisterInfoDTO): Promise<import("../../entites/user.entity").User[]>;
    createMany(users: any): Promise<boolean>;
}
