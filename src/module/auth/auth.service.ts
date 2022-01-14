import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entites/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(username: string, pwd: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException(
        { message: '未注册用户', error: '未注册用户' },
        HttpStatus.NOT_FOUND,
      );
    } else if (user.password != pwd) {
      throw new HttpException(
        { message: '密码不正确', error: '密码不正确' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async login(user: any): Promise<any> {
    const u = await this.validate(user.username, user.password);
    const payload = { username: u.username, sub: u.id };
    const { password, ...result } = u;
    (result as any).accessToken = this.jwtService.sign(payload);
    return result;
  }
}
