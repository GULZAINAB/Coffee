import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavour } from "./flavour.entity";
@Entity()
export class coffee{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    name : string;
    @Column()
    brand : string;
    @JoinTable()
    @ManyToMany(type=>Flavour, (flavour)=>flavour.Coffees)
    flavours : string[];
}   