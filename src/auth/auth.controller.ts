import { Controller, Post, Get, Request } from '@nestjs/common';
import { NoAuth } from 'src/common/decorators/customize';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
