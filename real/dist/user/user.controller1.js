"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const role_guard_1 = require("../role/role.guard");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../role/role.decorator");
const role_enum_1 = require("../role/role.enum");
const jwt_access_token_guard_1 = require("../auth/jwt/jwt-access-token.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        const users = await this.userService.findAll();
        const newUsers = users.map((user) => {
            const { password } = user, newUser = __rest(user, ["password"]);
            return newUser;
        });
        return { data: { users: newUsers } };
    }
    async get(id) {
        const _a = await this.userService.findOne(id), { password } = _a, user = __rest(_a, ["password"]);
        return { data: { user } };
    }
    async create(createUserDto) {
        const _a = await this.userService.create(createUserDto), { password } = _a, user = __rest(_a, ["password"]);
        return { data: { user } };
    }
    async update(id, updateUserDto) {
        await this.userService.update(id, updateUserDto);
        return { data: { message: 'Successfully' } };
    }
    async deleteUser(id) {
        await this.userService.delete(id);
        return { data: { message: 'Successfully' } };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.CUSTOMER),
    (0, swagger_1.ApiOperation)({ summary: 'Get user based on id' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        description: 'enter user unique id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create new user in db' }),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Created user successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update user successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create new user in db' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        description: 'enter user unique id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete user successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller1.js.map