import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "./hotels.entity";

@Entity()

export class Categories{
    @PrimaryGeneratedColumn()
    id:number;
    @Column('varchar')
    name:string;
    @OneToMany(()=>Hotels,(hotel)=>hotel.categories)
    hotels:Hotels[]
}