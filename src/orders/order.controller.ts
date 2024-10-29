import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dto/createOrders.dto';
import { AuthGuard } from 'src/auth/authguard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly OrderService: OrderService) {}

    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
        
        const { user_id, products } = order
        
        return this.OrderService.addOrder(user_id, products);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getOrders(@Query('id', ParseUUIDPipe) id: string){
        return this.OrderService.getOrders(id);
    }
}
