import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import Product from 'src/Interfaces/product.interface';

@Injectable()
export class ProductsService {
    constructor(private readonly ProductRepository: ProductRepository) {}

    getProducts(page, limit): any {
        return this.ProductRepository.getProducts(page, limit);
    }

    async getProduct(id) {
        return await this.ProductRepository.getProduct(id)
    }

    async addProduct() {
        return this.ProductRepository.addProduct()
    }

    async updateProduct(id, productData) {
        return this.ProductRepository.updateProduct(id, productData)
    }

}
