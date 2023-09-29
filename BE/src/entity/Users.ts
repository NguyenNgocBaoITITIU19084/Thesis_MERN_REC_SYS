import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { UserProfile } from "./UserProfile"
import { Infor } from "./Infor"
import { UserRole } from "./Roles"

@Entity()
export class Users extends Infor{
    @PrimaryGeneratedColumn()
    id: number

    @Column("char", {length: 50, nullable: false, unique: true})
    userName: string

    @Column("varchar", {length: 255, nullable: false})
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    roles: UserRole[]

    @Column({default: true})
    isActive: boolean

}