import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { env } from 'node:process';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeRattingModule } from './coffe-ratting/coffe-ratting.module';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';
import appConfig from './app.config';
@Module({
  

  imports: [
    ConfigModule.forRoot({
      load:[appConfig],

      // validationSchema:Joi.object({
      //   DATABASE_HOST:Joi.required(),
      //   DATABASE_PORT:Joi.number().default(5432),

      // })
    }),
    CoffeeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:  process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER, 
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize:true
  }),
    CoffeRattingModule,
    CommonModule,],
  controllers: [AppController],
  providers: [AppService,],

})
export class AppModule {
  constructor(){
  }
}
  