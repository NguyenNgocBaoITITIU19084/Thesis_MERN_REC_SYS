import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { Infor } from "./Infor"

@Entity()
export class Brands extends Infor {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", {nullable: false, unique: true})
    name: string 

    @Column("text")
    description: string 

    @Column("varchar", {nullable: false})
    images: string
}