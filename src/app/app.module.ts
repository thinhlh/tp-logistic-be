import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `./env/${process.env.NODE_ENV}.env`,
    isGlobal: true,
  }),

  MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`),

    // TypeOrmModule.forRoot({
    //   host: process.env.DATABASE_HOST,
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   port: +process.env.DATABASE_PORT,
    //   type: "postgres",


    //   autoLoadEntities: true,
    //   synchronize: process.env.NODE_ENV === 'dev' ? true : false
    // }),
    AuthModule,
    PermissionModule,
    UserModule,
  ],
})
export class AppModule { }


