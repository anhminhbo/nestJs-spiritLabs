"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaPayload = void 0;
class KafkaPayload {
    create(messageId, body, messageType, topicName) {
        return {
            messageId,
            body,
            messageType,
            topicName,
            createdTime: new Date().toISOString(),
        };
    }
}
exports.KafkaPayload = KafkaPayload;
//# sourceMappingURL=kafka.message.js.map