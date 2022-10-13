import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';
import { UserResponse } from '../user/dto/user-response.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local.guard';
import { Token } from './token.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Get("/signup")
  async signup(): Promise<Token> {
    return {
      accessToken: "",
      refreshToken: ""
    }
  }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async signin(@Request() request: Req): Promise<Token> {
    return await this.authService.login(request.user as UserResponse)
  }
}
