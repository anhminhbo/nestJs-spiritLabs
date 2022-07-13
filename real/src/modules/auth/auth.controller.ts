import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { cookieOptions } from './jwt/cookie.options';
import { LocalAuthGuard } from './local/local-auth.guard';
import RequestWithUser from './interface/request-with-user';
import { Logger } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: RequestWithUser) {
    Logger.log(req);
    const loginResponse = await this.authService.login(req.user);
    req.res!.cookie('accessToken', loginResponse.accessToken, cookieOptions);
    return loginResponse;
  }

  @Post('/logout')
  async logout(@Req() req: Request) {
    req.res!.clearCookie('accessToken', cookieOptions);
    return 200;
  }
}
