import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseJson } from '../utils/class';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<ResponseJson>;
    get(id: number): Promise<ResponseJson>;
    create(createUserDto: CreateUserDto): Promise<ResponseJson>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseJson>;
    deleteUser(id: number): Promise<ResponseJson>;
}
