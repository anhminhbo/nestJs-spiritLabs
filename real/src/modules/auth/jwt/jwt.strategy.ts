import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt.payload';
import tokenExtractor from './token-extractor';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: tokenExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload) {
    return { userId: payload.userId, role: payload.role };
  }
}
