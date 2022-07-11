import { BaseEntity } from './../base.entity';
import { Role } from './role/role.enum';
export declare class User extends BaseEntity {
    name: string;
    password: string;
    avatar: string;
    role: Role[];
}
