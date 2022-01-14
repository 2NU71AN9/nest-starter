import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NoAuth, Role } from 'src/common/decorators/customize';
import { roleConstans } from '../auth/constants';
import { UsersService } from './users.service';
@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Role(roleConstans.SUPER_ADMIN)
  findOne(@Request() req) {
    return req.user;
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @NoAuth()
  @Post()
  async regist(@Body() params) {
    return this.usersService.create(params);
  }

  @Post('/many')
  async createMany(@Body() users) {
    return this.usersService.createMany(users);
  }
}
