import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { Infor } from "./Infor"

@Entity()
export class Categories extends Infor{
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar",{nullable: false, unique: true})
    name: string 

    @Column("varchar")
    description: string

    @Column("varchar")
    images: string

}