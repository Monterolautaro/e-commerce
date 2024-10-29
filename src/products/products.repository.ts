import { Injectable } from "@nestjs/common"
import * as data from '../archivo.json'
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { Category } from "src/entities/categories.entity";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
    ) {}

    async getProducts(page: number, limit: number): Promise<Product[]> {
       let products = await this.productRepository.find({
            relations: {
                category: true
            },
        })
        const start = (page - 1)*limit;
        const end = start + limit

        products = products.slice(start, end)
        return products
    }


    async getProduct(id: string): Promise<Product | string> {
        const product = await this.productRepository.findOneBy({ product_id: id })
        if(!product) {
            return `Producto con id ${id} no encontrado`
        }
        return product;
    }

    async addProduct(): Promise<string> {
        const categories = await this.categoriesRepository.find();

        data?.map(async (element) => {
            const category = categories.find(
                (category) => category.name === element.category,
            )
            const product = new Product();
            
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl
            product.stock = element.stock
            product.category = category

            await this.productRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(product)
            .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
            .execute();
        })
        return 'productos agregados'
    }

    async updateProduct(id: string, productData: Product): Promise<Product>{
      await this.productRepository.update(id, productData);
      const updatedProduct = await this.productRepository.findOneBy({ product_id: id });
      return updatedProduct
    }

    // async restoreProductsStock() {
    //     const products = await this.productRepository.find();
    //     products.map(async (product) => {
    //         await this.productRepository.update(product.product_id, { stock: product.stock + product.stock })
    //     })
    // }

}