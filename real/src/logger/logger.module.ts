import { Module } from '@nestjs/common';
import { KikoLoggerService } from './logger.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        KikoLoggerService
    ],
    exports: [
        KikoLoggerService
    ]
})
export class KikoLoggerModule { }