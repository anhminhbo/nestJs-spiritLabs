import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { KikoLoggerService } from '../logger/logger.service';
export declare class OrderGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private readonly kikoLoggerService;
    private readonly webSocketServer;
    constructor(kikoLoggerService: KikoLoggerService);
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handlePing(data: string, client: Socket): Promise<void>;
    emitEvent(room: string | string[], event: string, data: any): void;
}
