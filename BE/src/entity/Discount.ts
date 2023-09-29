import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { Infor } from "./Infor"

@Entity()
export class Discounts extends Infor{
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar",{length: 100})
    name: string

    @Column("varchar",{length: 10, nullable: false, unique: true})
    code: string

    @Column("text")
    description: string 

    @Column("double",{nullable: false})
    percent: number

    @Column({default: true})
    isActive: boolean
}