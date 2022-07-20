import { JwtPayload } from '../interface/jwt.payload';
declare const AccessTokenStrategy_base: new (...args: any[]) => any;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: number;
        role: import("../../role/role.enum").Role;
    }>;
}
declare const RefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: number;
        role: import("../../role/role.enum").Role;
    }>;
}
export {};
