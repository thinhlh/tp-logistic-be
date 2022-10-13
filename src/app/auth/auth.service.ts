import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { UserResponse } from '../user/dto/user-response.dto';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { JWTPayload } from './strategies/jwt.payload';
import { Token, TokenType } from './token.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<UserResponse | null> {

        const user = await this.userService.findUserByUsername(username)

        if (user && user.password == password) {
            const { password, ...result } = user

            return result
        }
        return null
    }


    async login(user: UserResponse): Promise<Token> {
        const access_payload: JWTPayload = {
            permissions: user.permissions,
            tokenType: TokenType.ACCESS_TOKEN,
            username: user.username
        }

        const refresh_payload: JWTPayload = {
            permissions: user.permissions,
            tokenType: TokenType.ACCESS_TOKEN,
            username: user.username
        }

        const jwt_access = this.jwtService.sign(access_payload)
        const jwt_refresh = this.jwtService.sign(refresh_payload)


        return ({
            accessToken: jwt_access,
            refreshToken: jwt_refresh
        })


    }
}
