import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HelloService } from './hello.service';
import { UserRole } from './classes/hello';

@ApiTags('hello')
@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'role', enum: UserRole })
  @ApiResponse({
    status: 200,
    description: '哈哈哈哈',
  })
  fetch(@Query() { id }, @Headers('token') token): string {
    console.log(id, token);
    return this.helloService.fetch(id);
  }

  @Post()
  @ApiBody({ description: '输入name' })
  save(@Body() { name }): string {
    console.log(name);
    return this.helloService.save(name);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '输入name' })
  edit(@Param('id', ParseIntPipe) id, @Body() { name }): string {
    console.log('id类型=>', typeof id);
    return this.helloService.edit(id, name);
  }

  @Delete()
  delete(@Query() { id }): string {
    return this.helloService.delete(id);
  }
}
