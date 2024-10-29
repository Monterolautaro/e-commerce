import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService implements OnModuleInit{
    constructor(private readonly ProductRepository: ProductRepository,
        private readonly CategoriesRepository: CategoriesService
    ) {}

    getProducts(page, limit): any {
        return this.ProductRepository.getProducts(page, limit);
    }

    async getProduct(id) {
        return await this.ProductRepository.getProduct(id)
    }

    async addProduct() {
        return this.ProductRepository.addProduct()
    }

    async onModuleInit() {
        await this.CategoriesRepository.onModuleInit()
        await this.addProduct()
    }

    async updateProduct(id, productData) {
        return this.ProductRepository.updateProduct(id, productData)
    }

}
