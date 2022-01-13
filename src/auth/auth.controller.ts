import { Controller, Post, Get, Request, Body } from '@nestjs/common';
import { NoAuth } from 'src/common/decorators/customize';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  @Post('login')
  async login(@Body() params) {
    return this.authService.login(params);
  }

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
