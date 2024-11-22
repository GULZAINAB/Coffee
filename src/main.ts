import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { DocumentBuilder ,SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    disableErrorMessages: false, // Ensure error messages are enabled

  }),
  );
  const options =new DocumentBuilder()
   .setTitle('iluvcoffee')
   .setDescription('coffee app')
   .setVersion('1.0')
   .build();
   const document =SwaggerModule.createDocument(app,options);
   SwaggerModule.setup('api',app,document);
  // app.useGlobalInterceptors(new WrapResponseInterceptor(),new TimeoutInterceptor())
  await app.listen(3000);
}
bootstrap();
  