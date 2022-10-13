import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { JWTGuard } from '../auth/strategies/jwt.guard';
import { UserResponse } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  @Get('/profile')
  @UseGuards(JWTGuard)
  async getProfile(@Request() request: Req): Promise<UserResponse> {
    const user = await this.userService.findUserByUsername((request.user as UserResponse).username)
    const { password, ...result } = user
    return result;
  }

}
