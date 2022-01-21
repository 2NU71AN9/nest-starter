import { UsersService } from 'src/module/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
        id: number;
        username: string;
        age: number;
        role: number;
        status: boolean;
        photos: import("../../entites/photo.entity").Photo[];
    }>;
}
export {};
