import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NoAuth, Role } from 'src/common/decorators/customize';
import { roleConstans } from '../auth/constants';
import { RegisterInfoDTO } from './user.dto';
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
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'size', required: false })
  findAll(@Query() { page, size }) {
    return this.usersService.findAll(page, size);
  }

  @NoAuth()
  @Post()
  async regist(@Body() body: RegisterInfoDTO) {
    return this.usersService.create(body);
  }

  @Post('/many')
  async createMany(@Body() users) {
    return this.usersService.createMany(users);
  }
}
