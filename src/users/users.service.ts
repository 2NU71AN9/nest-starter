import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, getRepository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['photos'] });
  }

  async create(user): Promise<User[]> {
    const { username } = user;
    const u = await this.usersRepository.findOne({ where: { username } });
    if (u) {
      throw new HttpException(
        { message: 'name 重复, name 重复', error: 'name 重复' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersRepository.save(user);
  }

  async createMany(users: User[]): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      users.forEach(async (user) => {
        await queryRunner.manager.getRepository(User).save(user);
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
