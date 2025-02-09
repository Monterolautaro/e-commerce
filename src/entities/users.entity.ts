import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from 'uuid'
import { Order } from "./orders.entity";
import { Role } from "src/roles.enum";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string = uuid();
    
    @Column({
        nullable: false,
        length: 50,
        unique: true,
        type: 'varchar'
    })
    email: string

    @Column({
        nullable: false,
        length: 50,
        type: 'varchar'
    })
    name: string

    @Column({
        nullable: false,
        length: 100,
        type: 'varchar'
    })
    password: string

    @Column({
        type: 'text'
    })
    address: string

    @Column({
        type: 'varchar',
        length: 15,
    })
    phone: number

    @Column({
        type: 'varchar',
        length: 50,
    })
    country: string

    @Column({
        type: 'date',
        nullable: true
    })
    birthday: Date

    @Column({
        type: 'boolean',
        default: false
    })
    isAdmin: boolean;

    // @Column({
    //     type: 'enum',
    //     enum: Role,
    //     default: Role.User
    // })
    // role: Role

    @Column({
        type: 'text'
    })
    city: string
    
    @OneToMany(()=> Order, (order) => order.user)
    @JoinColumn({ name: 'order_id' })
    orders!: Order[]
}