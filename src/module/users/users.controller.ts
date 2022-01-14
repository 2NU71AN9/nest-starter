import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NoAuth, Role } from 'src/common/decorators/customize';
import { roleConstans } from '../auth/constants';
import { UsersService } from './users.service';
@Controller('users')
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
