import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dto/createOrders.dto';

@Controller('orders')
export class OrderController {
    constructor(private readonly OrderService: OrderService) {}

    @Post()
    addOrder(@Body() order: CreateOrderDto){
        const { user_id, products } = order
        return this.OrderService.addOrder(user_id, products);
    }

    @Get(':id')
    getOrders(@Query('id', ParseUUIDPipe) id: string){
        return this.OrderService.getOrders(id);
    }
}
