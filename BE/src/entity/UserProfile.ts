import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { Infor } from "./Infor"

@Entity()
export class UserProfile extends Infor{
    @PrimaryGeneratedColumn()
    id: number

    @Column("char",{length: 30, nullable: false})
    firstName: string

    @Column("char",{length: 30, nullable: false})
    lastName: string

    @Column("char",{length: 11, nullable: false})
    phoneNumber: string

    @Column("varchar",{length: 150, nullable: false})
    address: string 

    @Column("varchar",{length: 255, nullable: false})
    avatar: string 

    @Column({type: "int", width: 10000, default: 0})
    coins: number
}