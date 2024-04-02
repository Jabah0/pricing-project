import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from 'api-contract';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  //app.useGlobalInterceptors(new ResponseInterceptor());

  // swagger config
  if (env !== 'production') {
    const openApiDocument = generateOpenApi(contract, {
      info: {
        title: 'Pricing Api',
        version: '1.0.0',
      },
    });

    SwaggerModule.setup('api', app, openApiDocument);
  }

  await app.listen(3000);
}
bootstrap();
