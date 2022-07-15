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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const cookie_options_1 = require("./jwt/cookie.options");
const local_auth_guard_1 = require("./local/local-auth.guard");
const jwt_access_token_guard_1 = require("./jwt/jwt-access-token.guard");
const jwt_refresh_token_guard_1 = require("./jwt/jwt-refresh-token.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        const user = req.user;
        const { accessToken, refreshToken } = await this.authService.genToken(user);
        req.res.cookie('refreshToken', refreshToken, {
            maxAge: 60 * 60,
        });
        return { accessToken };
    }
    async logout(req) {
        req.res.clearCookie('refreshToken', cookie_options_1.cookieOptions);
        return req
            .res.header('Authorization', '')
            .json({ message: 'Log out successfully' });
    }
    async genToken(req) {
        const user = req.user;
        const { accessToken, refreshToken } = await this.authService.genToken(user);
        req.res.cookie('refreshToken', refreshToken, {
            maxAge: 60 * 60,
        });
        return { accessToken };
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Post)('/genToken'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "genToken", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map