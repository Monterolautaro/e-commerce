import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly OrderService: OrderService) {}

    @Post()
    addOrder(@Body() order: any){
        const { id, products } = order
        return this.OrderService.addOrder(id, products);
    }

    @Get(':id')
    getOrders(@Query('id') id: string){
        return this.OrderService.getOrders(id);
    }
}
