import { Role } from 'src/modules/role/role.enum';
export declare class CreateUserDto {
    fullName: string;
    password: string;
    avatar: string;
    role: Role;
}
