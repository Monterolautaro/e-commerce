import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private readonly CategoriesRepository: CategoriesRepository) {}

    getCategories(): any{
        return this.CategoriesRepository.getCategories();
    }

    addCategories(): any{
        return this.CategoriesRepository.addCategories();
    }
}
