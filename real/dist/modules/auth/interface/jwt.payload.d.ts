import { Role } from '../../role/role.enum';
export interface JwtPayload {
    userId: number;
    role: Role;
}
