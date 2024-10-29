import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]),
  CategoriesModule
],
  providers: [ProductsService, ProductRepository],
  controllers: [ProductsController]
})
export class ProductsModule {}
