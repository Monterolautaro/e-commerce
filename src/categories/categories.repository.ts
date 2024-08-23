import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../archivo.json'

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private CategoriesRepository: Repository<Category>,
        ) {}

    async getCategories(): Promise<Category[]> {
       return await this.CategoriesRepository.find()
    }

    async addCategories(){
        data?.map(async (element) => {
            await this.CategoriesRepository

            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({name: element.category})
            .orIgnore()
            .execute()
        });
        
        return 'Categorias agregadas'
    }
}
