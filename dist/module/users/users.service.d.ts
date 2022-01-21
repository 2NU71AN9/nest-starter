import { Connection, Repository } from 'typeorm';
import { User } from '../../entites/user.entity';
export declare class UsersService {
    private usersRepository;
    private connection;
    constructor(usersRepository: Repository<User>, connection: Connection);
    findAll(): Promise<User[]>;
    findUserWithId(id: any): Promise<User>;
    create(user: any): Promise<User[]>;
    createMany(users: User[]): Promise<boolean>;
}
