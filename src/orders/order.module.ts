import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { User } from 'src/entities/users.entity';
import { Product } from 'src/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User, OrderDetail])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository]
})
export class orderModule {}
