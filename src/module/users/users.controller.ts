import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { NoAuth } from 'src/common/decorators/customize';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
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
