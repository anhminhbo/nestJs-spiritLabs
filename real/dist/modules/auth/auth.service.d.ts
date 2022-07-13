import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import LoginResponse from './interface/login.response';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getUser(fullName: string, password: string): Promise<User | null>;
    login(user: User): Promise<LoginResponse>;
}
