import { Controller, Get ,Post, Param ,Body,Patch, Delete,Query, SetMetadata, ParseIntPipe} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto/update-coffe.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorators';
@Controller('coffee')
export class CoffeeController {
    constructor( private readonly coffeeService : CoffeeService){}

    @Public()


    @Get()
     async findAll(@Query() paginationQuery:PaginationQueryDto ){
        await new Promise(resolve =>setTimeout(resolve,5000))
        // const {limit, offset} = paginationQuery
        return this.coffeeService.findAll(paginationQuery);
    }
    @Get(":id")
    findOne(@Param('id',ParseIntPipe) id : number){
        console.log(id)
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
