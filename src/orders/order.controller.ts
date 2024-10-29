import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dto/createOrders.dto';
import { AuthGuard } from 'src/auth/authguard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly OrderService: OrderService) {}

    @Post()
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addOrder(@Body() order: CreateOrderDto){
        
        const { user_id, products } = order
        
        return this.OrderService.addOrder(user_id, products);
    }

    @Get(':id')
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getOrders(@Query('id', ParseUUIDPipe) id: string){
        return this.OrderService.getOrders(id);
    }
}
