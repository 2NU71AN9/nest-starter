import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { HelloService } from './hello.service'

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService: HelloService) { };

    @Get()
    fetch(@Query() { id }, @Headers('token') token): string {
        console.log(id, token);
        return this.helloService.fetch(id);
    }

    @Post()
    save(@Body() { name }): string {
        console.log(name);
        return this.helloService.save(name)
    }

    @Patch(':id')
    edit(@Param() { id }, @Body() { name }): string {
        return this.helloService.edit(id, name);
    }

    @Delete()
    delete(@Query() { id }): string {
        return this.helloService.delete(id);
    }
}
