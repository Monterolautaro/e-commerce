import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(private readonly OrderRepository: OrderRepository) {}

    addOrder(id: string, products: any){
        return this.OrderRepository.addOrder(id, products);
    }

    getOrders(id: string){
        return this.OrderRepository.getOrders(id);
    }
}
