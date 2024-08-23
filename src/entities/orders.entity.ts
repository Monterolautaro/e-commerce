import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { User } from './users.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    order_id: string

    @CreateDateColumn({
        type: 'date'
    })
    date: Date

   @ManyToOne(()=> User, (user) => user.orders)
   @JoinColumn({name: 'user_id'})
   user: User

   @OneToOne(()=> OrderDetail, (orderDetail) => orderDetail.order)
   orderDetail: OrderDetail;
}