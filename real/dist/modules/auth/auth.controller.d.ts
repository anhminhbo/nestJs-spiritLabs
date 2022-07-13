import { Request } from 'express';
import { AuthService } from './auth.service';
import RequestWithUser from './interface/request-with-user';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: RequestWithUser): Promise<import("./interface/login.response").default>;
    logout(req: Request): Promise<number>;
}
