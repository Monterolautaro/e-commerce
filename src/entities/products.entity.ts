import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories.entity";
import { OrderDetail } from "./orderDetails.entity";

@Entity({
    name: 'products'
})
export class Product {

    @PrimaryGeneratedColumn('uuid')
    product_id: string

    @Column({
        nullable: false,
        type: 'varchar',
        length: 50,
        unique: true
    })
    name: string
    @Column({
        nullable: false,
        type: 'text'
    })
    description: string
    @Column( 'decimal', {
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number
    @Column({
        type: 'numeric',
        nullable: false
    })
    stock: number
    @Column({
        type: 'text',
        default: 'https://www.google.com/imgres?q=imagen%20de%20objeto&imgurl=https%3A%2F%2Fllevatilde.es%2Fimagetexts%2Fc%2Fc4%2Fobjeto.png&imgrefurl=https%3A%2F%2Fllevatilde.es%2Fpalabra%2Fobj%25C3%25A9to&docid=8BQhH-CzxCX0nM&tbnid=zf2rUgpIyE6lqM&vet=12ahUKEwjhmLDnsoeIAxWUp5UCHclvHy4QM3oECHkQAA..i&w=1200&h=666&hcb=2&ved=2ahUKEwjhmLDnsoeIAxWUp5UCHclvHy4QM3oECHkQAA'
    })
    imgUrl: string

    @ManyToOne(()=> Category, (category) => category.products)
    @JoinColumn({ name: "category_id"})
    category: Category

    @ManyToMany(()=> OrderDetail, orderDetail => orderDetail.products)
    orderDetail: OrderDetail[];
}