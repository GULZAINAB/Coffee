import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavour } from "./flavour.entity/flavour.entity";
@Entity()
export class coffee{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column({nullable:true})
    description: string;

    @Column()
    price:number;
    @Column()
    brand : string;

    @Column({default:0})
    recommendation: number;
 
    @JoinTable()
    @ManyToMany(type=>Flavour, (flavour)=>flavour.Coffees,
    {
        cascade:true,
    })
    flavours : Flavour[];
}   