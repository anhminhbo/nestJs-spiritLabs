import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { cookieOptions } from './jwt/cookie.options';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AccessTokenGuard } from './jwt/jwt-access-token.guard';
import { RefreshTokenGuard } from './jwt/jwt-refresh-token.guard';
import RequestWithUser from './interface/request-with-user';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: RequestWithUser) {
    const user = req.user;
    const { accessToken, refreshToken } = await this.authService.genToken(user);
    req.res!.cookie('refreshToken', refreshToken, {
      maxAge: 60 * 60,
    });
    return { accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  async logout(@Req() req: Request) {
    req.res!.clearCookie('refreshToken', cookieOptions);
    return req
      .res!.header('Authorization', '')
      .json({ message: 'Log out successfully' });
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/genToken')
  async genToken(@Req() req: RequestWithUser) {
    const user = req.user;
    const { accessToken, refreshToken } = await this.authService.genToken(user);
    req.res!.cookie('refreshToken', refreshToken, {
      maxAge: 60 * 60,
    });
    return { accessToken };
  }
}
