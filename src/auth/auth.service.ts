import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validate(username: string, password: string): Promise<any> {
    const user = { username: '张三', password: '123456' };
    if (user && user.username === username && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user.userId };
    console.log(payload);
    return { accessToken: this.jwtService.sign(payload) };
  }
}
