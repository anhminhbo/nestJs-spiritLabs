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
exports.OrderGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const logger_service_1 = require("../logger/logger.service");
let OrderGateway = class OrderGateway {
    constructor(kikoLoggerService) {
        this.kikoLoggerService = kikoLoggerService;
    }
    afterInit(server) {
        console.log('====> afterInit');
    }
    async handleConnection(client) {
        this.kikoLoggerService.debug('New client connected');
        const token = client.handshake.auth.token;
        if (!token) {
            client.emit('exception', {
                status: 'error',
                message: 'Invalid credentials.',
            });
        }
    }
    handleDisconnect(client) {
        this.kikoLoggerService.debug('Client disconnected');
    }
    async handlePing(data, client) {
        this.kikoLoggerService.debug('ping ping ping');
        client.emit('pong', 'pong pong pong');
    }
    emitEvent(room, event, data) {
        this.kikoLoggerService.debug(`OrderGateway - emitEvent: ${JSON.stringify({ room, event, data })}`);
        this.webSocketServer.in(room).emit(event, data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OrderGateway.prototype, "webSocketServer", void 0);
__decorate([
    (0, common_1.UseFilters)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], OrderGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], OrderGateway.prototype, "handlePing", null);
OrderGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(9101, {
        path: '/chat-ws',
        cors: {
            origin: '*',
        },
        transports: ['websocket'],
    }),
    __metadata("design:paramtypes", [logger_service_1.KikoLoggerService])
], OrderGateway);
exports.OrderGateway = OrderGateway;
//# sourceMappingURL=socket-gateway.service.js.map