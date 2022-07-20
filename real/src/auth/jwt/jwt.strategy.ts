import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt.payload';
import { bearerTokenExtractor, cookieTokenExtractor } from './token-extractor';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor() {
    super({
      jwtFromRequest: bearerTokenExtractor,
      ignoreExpiration: false,
      secretOrKey: 'accessToken',
    });
  }
  async validate(payload: JwtPayload) {
    return { userId: payload.userId, role: payload.role };
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor() {
    super({
      jwtFromRequest: cookieTokenExtractor,
      ignoreExpiration: false,
      secretOrKey: 'refreshToken',
    });
  }
  async validate(payload: JwtPayload) {
    return { userId: payload.userId, role: payload.role };
  }
}
