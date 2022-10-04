import { Controller, Module, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './permission/permission.controller';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `./env/${process.env.NODE_ENV}.env`,
    isGlobal: true,
  }),
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return ({
        uri: `mongodb://${configService.get<string>("MONGO_HOST")}/${configService.get<number>("MONGO_DB")}`
      })
    }
  }),


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
    PermissionModule,
  ],
})
export class AppModule { }


