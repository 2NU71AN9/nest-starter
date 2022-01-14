import {
  Controller,
  Post,
  Get,
  Request,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { NoAuth } from 'src/common/decorators/customize';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
