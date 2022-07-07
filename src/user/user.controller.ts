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

import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
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
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Put('update')
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
  update(@Body() user: User) {
    return this.userService.update(user);
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
