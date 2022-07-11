import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => ({
  client: {
    clientId: process.env.KAFKA_CLIENT_CLIENTID,
    brokers: process.env.KAFKA_CLIENT_BROKERS,
  },
  consumer: {
    groupId: process.env.KAFKA_CONSUMER_GROUPID,
  },
}));
