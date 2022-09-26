import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `./env/${process.env.NODE_ENV}.env`
  }),
  TypeOrmModule.forRoot({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: +process.env.DATABASE_PORT,
    type: "postgres",


    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'dev' ? true : false
  }),
  ],
})
export class AppModule { }
