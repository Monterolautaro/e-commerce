import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from 'uuid'
import { Product } from "./products.entity";

@Entity({
    name: 'categories'
})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    category_id: string = uuid();

    @Column({
        nullable: false,
        type: 'varchar',
        length: 50
    })
    name: string

    @OneToMany(()=> Product , (product) => product.category)
    products: Product[]
}