import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { Infor } from "./Infor"

@Entity()
export class Products extends Infor{
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", {length: 255, nullable: false})
    name: string 

    @Column("double", {nullable: false})
    price: number

    @Column("double")
    originalPrice: number

    @Column("int", {nullable: false})
    inStock: number 

    @Column("text")
    description: string 

    @Column("varchar", {nullable: false})
    images: string 

    @Column({default: true})
    isActive: boolean
}