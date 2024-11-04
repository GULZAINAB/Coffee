import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coffee } from './entity/coffee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([coffee])], 
    controllers: [CoffeeController],
    providers:[CoffeeService]})
export class CoffeeModule {}
 