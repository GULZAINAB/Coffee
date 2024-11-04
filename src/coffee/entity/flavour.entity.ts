import {Column,Entity,ManyToMany,PrimaryGeneratedColumn} from 'typeorm';
import { coffee } from './coffee.entity';
@Entity()
export class Flavour{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    name : string;
    @ManyToMany(type=>coffee,
        Coffee => Coffee.flavours)
    Coffees : coffee[];
}
 