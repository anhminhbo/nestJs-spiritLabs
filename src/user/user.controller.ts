import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  get(@Param() id) {
    return this.userService.findOne(id);
  }

  @Post('create')
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Put('update')
  update(@Body() user: User) {
    return this.userService.update(user);
  }

  @Delete('/delete/:id')
  deleteUser(@Param() id) {
    return this.userService.delete(id);
  }
}
