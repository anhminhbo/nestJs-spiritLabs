import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../auth/jwt/jwt-access-token.guard';
import { RolesGuard } from '../role/role.guard';

describe('UserController', () => {
  let userController: UserController;

  const mockUser1 = new User();

  const mockUsers = [];

  const mockUserService = {
    findAll: jest.fn().mockImplementation((users: User[]) => {
      return {
        users: [
          {
            id: 1,
            createdAt: '2022-07-13T10:14:56.767Z',
            updatedAt: '2022-07-13T10:14:56.767Z',
            fullName: 'minh1',
            avatar: 'www21',
            role: 'admin',
          },
          {
            id: 2,
            createdAt: '2022-07-13T10:15:15.123Z',
            updatedAt: '2022-07-13T10:15:15.123Z',
            fullName: 'minh2',
            avatar: 'www22',
            role: 'customer',
          },
          {
            id: 3,
            createdAt: '2022-07-13T10:15:22.803Z',
            updatedAt: '2022-07-13T10:15:22.803Z',
            fullName: 'minh3',
            avatar: 'www23',
            role: 'customer',
          },
        ],
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: AccessTokenGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  it('UserController should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('UserController GET /user/ should return all users', () => {
    expect(userController.findAll()).toEqual({
      statusCode: 200,
      data: {
        users: [
          {
            id: 1,
            createdAt: '2022-07-13T10:14:56.767Z',
            updatedAt: '2022-07-13T10:14:56.767Z',
            fullName: 'minh1',
            avatar: 'www21',
            role: 'admin',
          },
          {
            id: 2,
            createdAt: '2022-07-13T10:15:15.123Z',
            updatedAt: '2022-07-13T10:15:15.123Z',
            fullName: 'minh2',
            avatar: 'www22',
            role: 'customer',
          },
          {
            id: 3,
            createdAt: '2022-07-13T10:15:22.803Z',
            updatedAt: '2022-07-13T10:15:22.803Z',
            fullName: 'minh3',
            avatar: 'www23',
            role: 'customer',
          },
        ],
      },
    });
  });
});
