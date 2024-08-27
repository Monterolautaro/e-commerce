import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(private readonly OrderRepository: OrderRepository) {}

    addOrder(user_id: string, products: any){
        return this.OrderRepository.addOrder(user_id, products);
    }

    getOrders(id: string){
        return this.OrderRepository.getOrders(id);
    }
}
