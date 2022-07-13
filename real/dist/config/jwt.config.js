"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwtConfig', () => ({
    secret: process.env.JWT_SECRET,
    expirationTime: Number.parseInt(process.env.JWT_EXPIRATION_TIME),
    cookieName: 'token',
}));
//# sourceMappingURL=jwt.config.js.map