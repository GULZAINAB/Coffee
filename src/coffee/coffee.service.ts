import { Injectable, NotFoundException } from '@nestjs/common';
import { coffee } from './entity/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto/update-coffe.dto';

@Injectable()
export class CoffeeService {
    constructor(
        @InjectRepository(coffee)
        private readonly coffeeRepository: Repository<coffee>
    ){}
    
    findAll(){
        return this.coffeeRepository.find();
    }

    async findOne(id :number){
        const coff =  await this.coffeeRepository.findOne({where:{id}, // TypeORM expects a where clause
    });
        if (!coff){
         throw new NotFoundException(`coffee ${id} not found`)
        }
        return coff;
    }
    create(createCoffeDto : CreateCoffeDto){
        const coff = this.coffeeRepository.create(createCoffeDto);
        return this.coffeeRepository.save(coff);
   
     
    }
     async update(id :number,updateCoffedto : UpdateCoffeDto){
        const coff = await this.coffeeRepository.preload({
            id :+id,
            ...updateCoffedto,
        });
        if (!coff ){
            throw new NotFoundException(`coffee #${id} not found`);
     }
        return this.coffeeRepository.save(coff)
    }
     async remove (id :number ){
        const coffee = await this.findOne(id);

        return this.coffeeRepository.remove(coffee)
        
    }

}
  