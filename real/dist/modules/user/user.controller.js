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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const role_guard_1 = require("../role/role.guard");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../role/role.decorator");
const role_enum_1 = require("../role/role.enum");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    get(id) {
        return this.userService.findOne(id);
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    deleteUser(id) {
        return this.userService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
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
    __metadata("design:returntype", void 0)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('create'),
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
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('update'),
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
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
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
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map