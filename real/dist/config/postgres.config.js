"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('postgres', () => ({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5431,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
}));
//# sourceMappingURL=postgres.config.js.map