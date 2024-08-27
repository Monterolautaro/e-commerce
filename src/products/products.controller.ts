import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import Product from 'src/Interfaces/product.interface';
import { StructureValidationInterceptor } from './structure-validation.interceptor';
import { AuthGuard } from 'src/auth/authguard.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService ) {}

    @Get()
    getProducts(@Query('page') page:number = 1, @Query('limit') limit: number = 5): Product {
        if(page && limit) return this.ProductsService.getProducts(page, limit)

        return this.ProductsService.getProducts(page, limit);
    }

    @Get('seeder')
    addProducts() {
        return this.ProductsService.addProduct()
    }

    @Get(':id')
    getProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.ProductsService.getProduct(id)
    }


    @HttpCode(200)
    @Put(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(StructureValidationInterceptor)
    updateProducts(@Param('id', ParseUUIDPipe) id: string, @Body() productData: Product) {
        return this.ProductsService.updateProduct(id, productData)
    }

}
