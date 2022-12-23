/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() body) {
    const result = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (result.matched) {
      const token = await this.authService.login({
        id: result.data.id,
        username: result.data.username,
        email: result.data.email,
      });
      return {
        matched: result.matched,
        data: result.data,
        ...token,
      };
    }
    return result;
  }

  @Post('/register')
  async register(@Body() body) {
    try {
      const result = await this.authService.register(body);
      return result;
    } catch (error) {
      return error;
    }
  }
}
