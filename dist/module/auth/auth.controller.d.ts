import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDTO): Promise<any>;
}
