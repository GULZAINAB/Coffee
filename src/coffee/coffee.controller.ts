import { Controller, Get ,Post, Param ,Body,Patch, Delete,Query} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto/update-coffe.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffee')
export class CoffeeController {
    constructor( private readonly coffeeService : CoffeeService){}
    @Get()
    findAll(@Query() paginationQuery:PaginationQueryDto ){
        // const {limit, offset} = paginationQuery
        return this.coffeeService.findAll(paginationQuery);
    }
    @Get(":id")
    findOne(@Param('id') id : number){
        return this.coffeeService.findOne(id);
    }
    @Post()
    create(@Body() createCoffeDto : CreateCoffeDto){
        console.log(createCoffeDto  instanceof CreateCoffeDto);
        return this.coffeeService.create(createCoffeDto);
    }
    @Patch(':id')
    update(@Param('id') id:number ,@Body() updateCoffeDto:UpdateCoffeDto){
        return this.coffeeService.update(id,updateCoffeDto);
    }
    @Delete(':id')
    remove(@Param('id') id : number ){
        return this.coffeeService.remove(id);
    }
}
