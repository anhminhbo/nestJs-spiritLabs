import { Role } from 'src/role/role.enum';
export declare class CreateUserDto {
    fullName: string;
    password: string;
    avatar: string;
    role: Role;
}
