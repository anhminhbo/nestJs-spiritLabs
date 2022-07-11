import { UseFilters } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { KikoLoggerService } from '../logger/logger.service';

@WebSocketGateway(9101, {
  path: '/chat-ws',
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class OrderGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private readonly webSocketServer: Server;

  constructor(private readonly kikoLoggerService: KikoLoggerService) {}

  afterInit(server: any) {
    console.log('====> afterInit');
  }

  @UseFilters()
  async handleConnection(client: Socket) {
    this.kikoLoggerService.debug('New client connected');
    const token = client.handshake.auth.token;
    if (!token) {
      client.emit('exception', {
        status: 'error',
        message: 'Invalid credentials.',
      });
    }
  }

  handleDisconnect(client: Socket) {
    this.kikoLoggerService.debug('Client disconnected');
  }

  @SubscribeMessage('ping')
  async handlePing(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    // return 'pong';
    this.kikoLoggerService.debug('ping ping ping');
    client.emit('pong', 'pong pong pong');
  }

  emitEvent(room: string | string[], event: string, data: any) {
    this.kikoLoggerService.debug(
      `OrderGateway - emitEvent: ${JSON.stringify({ room, event, data })}`,
    );
    this.webSocketServer.in(room).emit(event, data);
  }
}
