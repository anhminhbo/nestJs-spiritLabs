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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KikoLoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");
const config_1 = require("@nestjs/config");
let KikoLoggerService = class KikoLoggerService {
    constructor(configService) {
        this.configService = configService;
        const fileTransport = new winston.transports.DailyRotateFile({
            filename: `${path.join(process.cwd(), `logs/`)}/application-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
        });
        const consoleTransport = new winston.transports.Console();
        const logFormat = winston.format.combine(winston.format.timestamp(), winston.format.printf((info) => `${info.timestamp} | ${info.level} | ${info.message}`));
        this.winstonLogger = winston.createLogger({
            level: this.configService.get('app.logLevel'),
            format: logFormat,
            transports: [fileTransport, consoleTransport],
        });
    }
    error(message, ...meta) {
        this.winstonLogger.error(message, meta);
    }
    info(message, ...meta) {
        this.winstonLogger.info(message, meta);
    }
    debug(message, ...meta) {
        this.winstonLogger.debug(message, meta);
    }
};
KikoLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], KikoLoggerService);
exports.KikoLoggerService = KikoLoggerService;
//# sourceMappingURL=logger.service.js.map