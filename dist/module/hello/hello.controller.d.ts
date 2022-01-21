import { HelloService } from './hello.service';
export declare class HelloController {
    private readonly helloService;
    constructor(helloService: HelloService);
    fetch({ id }: {
        id: any;
    }, token: any): string;
    save({ name }: {
        name: any;
    }): string;
    edit(id: any, { name }: {
        name: any;
    }): string;
    delete({ id }: {
        id: any;
    }): string;
}
