import { Request } from 'express';
import { AuthService } from './auth.service';
import RequestWithUser from './interface/request-with-user';
import { ResponseJson } from 'src/utils/class';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: RequestWithUser): Promise<ResponseJson>;
    logout(req: Request): Promise<import("express-serve-static-core").Response<any, Record<string, any>, number>>;
    genToken(req: RequestWithUser): Promise<ResponseJson>;
}
