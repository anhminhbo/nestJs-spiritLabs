import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    getOneByUsername(fullName: string): Promise<User>;
    create(user: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}
