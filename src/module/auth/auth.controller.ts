import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { NoAuth } from 'src/common/decorators/customize';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  // @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
