import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        return ({
          secret: configService.get<string>("SECRET_KEY"),
          signOptions: {
            expiresIn: configService.get<string>("TOKEN_EXPIRE")
          }

        })
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    ({
      provide: JWTStrategy.name,
      inject: [ConfigService, UserService, JwtService],
      useFactory(configService: ConfigService, userService: UserService, jwtService: JwtService): JWTStrategy {
        return new JWTStrategy(configService, userService, jwtService)
      },
    }),
    ({
      provide: LocalStrategy.name,
      inject: [AuthService],
      useFactory(authService: AuthService) {
        return new LocalStrategy(authService);
      },
    })],
})
export class AuthModule { }
