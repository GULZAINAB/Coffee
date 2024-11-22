import { Injectable,Inject, NotFoundException,Scope } from '@nestjs/common';
import { coffee } from './entity/coffee.entity';
import { InjectRepository} from '@nestjs/typeorm';
import { Connection, Repository  } from 'typeorm';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto/update-coffe.dto';
import { Flavour } from './entity/flavour.entity/flavour.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffeconstant';

@Injectable({scope : Scope.REQUEST})
export class CoffeeService {  
  constructor(
    @InjectRepository(coffee)
    private readonly coffeeRepository: Repository<coffee>,
    @InjectRepository(Flavour)
    private readonly flavourRepository: Repository<Flavour>,
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeebrands:String[],

  ){
     console.log("COFFEBRAND")
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const {limit,offset} =paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavours'],
      skip:offset,
      take:limit, 
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavours'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeDto: CreateCoffeDto) {
    const flavors = await Promise.all(
      createCoffeDto.flavours.map(name => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeDto,
      flavours: flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeDto: UpdateCoffeDto) {
    const flavors = updateCoffeDto.flavours &&
      (await Promise.all(updateCoffeDto.flavours.map(name => this.preloadFlavorByName(name))));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeDto,
      flavours: flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee:coffee){
    const queryRunner =this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
        coffee.recommendation++;

        const recommendEvent = new Event();
        recommendEvent.name= 'recommended_coffee';
        recommendEvent.type='coffee';
        recommendEvent.payload={coffeId:coffee.id};
        await queryRunner.manager.save(coffee);
        await queryRunner.manager.save(recommendEvent);
        await queryRunner.commitTransaction()
    }
    catch(err){
        await queryRunner.rollbackTransaction();
    }finally{
        await queryRunner.release(); 

    }
  }



  private async preloadFlavorByName(name: string): Promise<Flavour> {
    const existingFlavor = await this.flavourRepository.findOne({ where: { name } });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavourRepository.create({ name });
  }
}
