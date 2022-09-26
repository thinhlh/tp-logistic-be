import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomExceptionFilter } from './config/filters/exception.filter';
import { ErrorResponseInterceptor } from './config/interceptors/error-response.interceptor';
import { ResponseInterceptor } from './config/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await createApp();

  configApp(app);
  documentingApp(app);
  runApp(app);
}

async function createApp() {
  return await NestFactory.create(AppModule);
}

async function runApp(app: INestApplication) {
  app.listen(3000);
}

async function configApp(app: INestApplication) {
  app.setGlobalPrefix("/api")
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor(), new ErrorResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
}

async function documentingApp(app: INestApplication) {
  const option = new DocumentBuilder()
    .setTitle("Thinh Nest Template API")
    .setVersion("0.0.1")
    .setDescription("The API documentation of application.")
    .setContact("thinhlh", "www.hoangthinh.me", "thinhlh0812@gmail.com")
    .setLicense("MIT license", "https://github.com/thinhlh/nestjs-template/blob/main/LICENSE")
    .build();

  const document = SwaggerModule.createDocument(app, option);

  SwaggerModule.setup("/docs", app, document);
}

bootstrap();
