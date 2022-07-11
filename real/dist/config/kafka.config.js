"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('kafka', () => ({
    client: {
        clientId: process.env.KAFKA_CLIENT_CLIENTID,
        brokers: process.env.KAFKA_CLIENT_BROKERS,
    },
    consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUPID,
    },
}));
//# sourceMappingURL=kafka.config.js.map