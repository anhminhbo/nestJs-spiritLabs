import 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';
export declare class KikoLoggerService {
    private configService;
    private winstonLogger;
    constructor(configService: ConfigService);
    error(message: string, ...meta: any[]): void;
    info(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
}
