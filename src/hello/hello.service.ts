import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    fetch(id: string): string {
        return `hello ${id}`;
    }

    save(name: string): string {
        return `保存成功, ${name}`;
    }

    edit(id: string, name: string): string {
        return `${id} 修改成功 ${name}`;
    }

    delete(id: string): string {
        return `删除成功 ${id}`;
    }
}
