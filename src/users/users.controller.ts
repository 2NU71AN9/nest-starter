import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() params) {
    return this.usersService.create(params);
  }

  @Post('/many')
  async createMany(@Body() users) {
    return this.usersService.createMany(users);
  }
}
