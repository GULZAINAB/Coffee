import { Injectable } from '@nestjs/common';
import { CoffeeService } from 'src/coffee/coffee.service';

@Injectable()
export class CoffeRattingService {
    constructor(private readonly coffeeService :CoffeeService){}
}

