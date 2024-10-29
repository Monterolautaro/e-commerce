import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import Product from 'src/Interfaces/product.interface';
import { StructureValidationInterceptor } from './structure-validation.interceptor';
import { AuthGuard } from 'src/auth/authguard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

// @ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService ) {}


    @Get()
    // @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    getProducts(@Query('page') page:number = 1, @Query('limit') limit: number = 5): Product {
        if(page && limit) return this.ProductsService.getProducts(page, limit)

        return this.ProductsService.getProducts(page, limit);
    }

    @Get('seeder')
    // @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    addProducts() {
        return this.ProductsService.addProduct()
    }

    @Get(':id')
    // @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard)
    getProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.ProductsService.getProduct(id)
    }


    @HttpCode(200)
    @Put(':id')
    // @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @UseInterceptors(StructureValidationInterceptor)
    updateProducts(@Param('id', ParseUUIDPipe) id: string, @Body() productData: Product) {
        return this.ProductsService.updateProduct(id, productData)
    }

}
