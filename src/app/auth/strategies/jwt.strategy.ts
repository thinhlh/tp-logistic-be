import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserResponse } from "src/app/user/dto/user-response.dto";
import { UserService } from "src/app/user/user.service";
import { JWTPayload } from "./jwt.payload";

export class JWTStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("SECRET_KEY")
        })
    }

    async validate(payload: UserResponse): Promise<UserResponse | null> {
        const user = await this.userService.findUserByUsername(payload.username)

        if (!user)
            throw new UnauthorizedException()
        return user
    }
}