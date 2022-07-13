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
import { User } from './entity/user.entity';
import RequestWithUser from '../auth/interface/request-with-user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../role/role.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
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
  get(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('create')
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('update')
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
  update(@Query('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/delete/:id')
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
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
