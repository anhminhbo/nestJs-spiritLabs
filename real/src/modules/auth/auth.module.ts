import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './jwt/jwt-refresh-token.guard';
import { AccessTokenGuard } from './jwt/jwt-access-token.guard';
import { AccessTokenStrategy, RefreshTokenStrategy } from './jwt/jwt.strategy';
import { LocalAuthGuard } from './local/local-auth.guard';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenGuard,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
