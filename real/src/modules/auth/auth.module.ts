import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalAuthGuard } from './local/local-auth.guard';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number.parseInt(process.env.JWT_EXPIRATION_TIME!),
      },
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
