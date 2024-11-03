import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { coffee } from './entity/coffee.entity';

@Injectable()
export class CoffeeService {
    private coffee : coffee[]=[{
        id :1,
        name:"coffee1",
        brand :'buddy brew',
        flavours : ['choco','vanilla']

    }
];
    findAll(){
        return this.coffee;
    }
    findOne(id :string){
        const coff =  this.coffee.find(item=>item.id === +id);
        if (!coff){
         throw new NotFoundException(`coffee ${id} not found`)
        }
        return coff;
    }
    create(createCoffedto : any){
        this.coffee.push(createCoffedto);
        return createCoffedto;
    
    }
    update(id :string,updateCoffedto : any){
        const existing =this.findOne(id);
        if (existing ){
            existing.name = updateCoffedto.name;
            existing.brand = updateCoffedto.brand;
            existing.flavours = updateCoffedto.flavours;

        }
    }
    remove (id :string ){
        const coffeindex = this.coffee.findIndex(item => item.id === +id);
        if(coffeindex >=0){
            this.coffee.splice(coffeindex,1)
        }
    }

}
  