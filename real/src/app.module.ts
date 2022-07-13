import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import kafkaConfig from './config/kafka.config';
import postgresConfig from './config/postgres.config';
import { KafkaModule } from './kafka/kafka.module';
import { KikoLoggerModule } from './logger/logger.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { SocketGatewayModule } from './socket-gateway/socket-gateway.module';
import { DatabaseModule } from './database/database.module';
import { RolesGuard } from './modules/role/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, postgresConfig, kafkaConfig],
      envFilePath: ['.env'],
    }),
    SocketGatewayModule,
    KikoLoggerModule,
    DatabaseModule,
    AuthModule,
    // RedisCacheModule,
    // KafkaModule.registerAsync(['CHAT_SERVICE'], {
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => [
    //     {
    //       name: 'CHAT_SERVICE',
    //       options: {
    //         client: {
    //           clientId: configService.get('kafka.client.clientId'),
    //           brokers: configService.get('kafka.client.brokers').split(';'),
    //         },
    //         consumer: {
    //           groupId: configService.get('kafka.consumer.groupId'),
    //         },
    //       },
    //     },
    //   ],
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
