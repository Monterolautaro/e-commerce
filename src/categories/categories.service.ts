import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService implements OnModuleInit {
    constructor(private readonly CategoriesRepository: CategoriesRepository) {}

    getCategories(): any{
        return this.CategoriesRepository.getCategories();
    }

    onModuleInit() {
        this.getCategories();
    }
    addCategories(): any{
        return this.CategoriesRepository.addCategories();
    }
}
