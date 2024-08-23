import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Order } from './orders.entity';
import { Product } from './products.entity';


@Entity({
    name: 'orderdetails'
})
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    orderdetail_id: string

    @Column('decimal',{ 
    precision: 10,
    scale: 2,
    nullable: false
    })
    price: number

    @OneToOne(()=> Order, (order) => order.orderDetail)
    @JoinColumn({ name: 'order_id'})
    order: Order

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'orderdetails_products',
        joinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'orderdetail_id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'product_id'
        }
    })
    products: Product[];
}