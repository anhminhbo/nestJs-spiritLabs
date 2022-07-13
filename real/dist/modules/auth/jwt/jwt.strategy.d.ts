import { JwtPayload } from '../interface/jwt.payload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: number;
        role: import("../../role/role.enum").Role;
    }>;
}
export {};
