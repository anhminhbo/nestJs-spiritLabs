import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import LoginResponse from './interface/login.response';
import { JwtPayload } from './interface/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async getUser(fullName: string, password: string): Promise<User | null> {
    const user = await this.userService.getOneByUsername(fullName);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload: JwtPayload = { userId: user.id, role: user.role };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
