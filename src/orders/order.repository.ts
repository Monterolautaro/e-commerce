import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>
    ) {}

    async addOrder(id: string, products: any) {
        let total = 0;

        const foundUser = await this.userRepository.findOneBy({user_id: id})
        if(!foundUser) throw new Error('Usuario no encontrado')

        const order = new Order();
        order.date = new Date();
        order.user = foundUser
        console.log({'Esto es lo que llega': products});
        
        const newOrder = await this.orderRepository.save(order)
        
        console.log({'Esta es la neworder': newOrder});
        
        
        console.log({'Esto es lo que llega':products});
        
        const productsArray = await Promise.all(
            products.map(async (element) => {
                console.log({'Este es el element_id': element.id});
                    
                const product = await this.productRepository.findOneBy({
                    product_id: element.id
                })
                
                console.log({'Este es el product linea 40':product});

                if(!product) return `Producto con id ${element.product_id} no encontrado`

                total += Number(product.price);

                await this.productRepository.update(
                    {product_id: element.product_id},
                    {stock: product.stock - 1}
                );

                return product;
            })
        )


        const orderDetail = new OrderDetail();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.order = newOrder;
        orderDetail.products = productsArray;

        console.log({'Esta es la orderdetail': orderDetail});
        
        await this.orderDetailRepository.save(orderDetail)
        
        
        
        return await this.orderRepository.find({
            where: { order_id: newOrder.order_id },
            relations: {
                orderDetail: {products: true}
            }
        })
    }

    const 

    async getOrders(id): Promise<Order>{
       const order = await this.orderRepository.findOne({
        where: { order_id: id },
        relations: {
            orderDetail: {
                products: true
            }
        }
       })
        
       if(!order) throw new Error(`Orden con id ${id} no encontrada`)

       return order
    }

}
