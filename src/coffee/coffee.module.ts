import { Injectable, Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coffee } from './entity/coffee.entity';
import { Flavour } from './entity/flavour.entity/flavour.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffeconstant';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';
 
@Module({
    imports: [TypeOrmModule.forFeature([coffee,Flavour,Event]),ConfigModule.forFeature(coffeeConfig) ], 
    controllers: [CoffeeController],
    providers:[
        CoffeeService,
        {
        provide: COFFEE_BRANDS,
        useFactory:() => ["buddybrew","nescsfe"],
    }, 

],
     exports:[CoffeeService],

})
export class CoffeeModule {}
  