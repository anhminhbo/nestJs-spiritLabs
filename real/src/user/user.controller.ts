import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../role/role.guard';

import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { AccessTokenGuard } from '../auth/jwt/jwt-access-token.guard';
import { ResponseJson } from '../utils/class';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({
    status: 200,
    description: 'All user in the DB',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'this is a unique user id',
            example: '1',
          },
          name: {
            type: 'string',
            description: 'this is a user name',
            example: 'minh',
          },
          password: {
            type: 'string',
            description: 'this is a user password',
            example: '123',
          },
          avatar: {
            type: 'string',
            description: 'this is a user avatar url',
            example: 'www.img',
          },
          createdAt: {
            type: 'Date',
            description: 'this is date when user is created in db',
            example: '2022-07-07T08:03:41.856Z',
          },
          updatedAt: {
            type: 'Date',
            description: 'this is date when user is updated in db',
            example: '2022-07-07T08:03:41.856Z',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findAll(): Promise<ResponseJson> {
    const users = await this.userService.findAll();
    const newUsers = users.map((user) => {
      const { password, ...newUser } = user;
      return newUser;
    });

    return { data: { users: newUsers } };
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'Get user based on id' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter user unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: ' user with id in the DB',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'this is a unique user id',
          example: '1',
        },
        name: {
          type: 'string',
          description: 'this is a user name',
          example: 'minh',
        },
        password: {
          type: 'string',
          description: 'this is a user password',
          example: '123',
        },
        avatar: {
          type: 'string',
          description: 'this is a user avatar url',
          example: 'www.img',
        },
        createdAt: {
          type: 'Date',
          description: 'this is date when user is created in db',
          example: '2022-07-07T08:03:41.856Z',
        },
        updatedAt: {
          type: 'Date',
          description: 'this is date when user is updated in db',
          example: '2022-07-07T08:03:41.856Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async get(@Param('id') id: number): Promise<ResponseJson> {
    const { password, ...user } = await this.userService.findOne(id);
    return { data: { user } };
  }

  @Post('create')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create new user in db' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'user',
          description: 'Name of the user',
        },
        password: {
          type: 'string',
          example: '123',
          description: 'Password of the user',
        },
        avatar: {
          type: 'string',
          example: 'www.img.com',
          description: 'Url of the user avatar',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Created user successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseJson> {
    const { password, ...user } = await this.userService.create(createUserDto);
    return { data: { user } };
  }

  @Patch('update')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: '1',
          description: 'Unique id of the user',
        },
        name: {
          type: 'string',
          example: 'user',
          description: 'Name of the user',
        },
        password: {
          type: 'string',
          example: '123',
          description: 'Password of the user',
        },
        avatar: {
          type: 'string',
          example: 'www.img.com',
          description: 'Url of the user avatar',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Update user successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async update(
    @Query('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseJson> {
    await this.userService.update(id, updateUserDto);
    return { data: { message: 'Successfully' } };
  }

  @Delete('/delete/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create new user in db' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter user unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Delete user successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async deleteUser(@Param('id') id: number): Promise<ResponseJson> {
    await this.userService.delete(id);
    return { data: { message: 'Successfully' } };
  }
}
