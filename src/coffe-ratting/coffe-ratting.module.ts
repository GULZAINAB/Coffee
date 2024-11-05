import { Module } from '@nestjs/common';
import { CoffeRattingService } from './coffe-ratting.service';
import { CoffeeModule } from 'src/coffee/coffee.module';

@Module({
  imports: [CoffeeModule],
  providers: [CoffeRattingService]
})
export class CoffeRattingModule {}
  