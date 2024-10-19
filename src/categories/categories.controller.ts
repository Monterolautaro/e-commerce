import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) {}

    @Get()
    getCategories(){
        return this.CategoriesService.getCategories();
    }

    @Get('seeder')
    addCategories(){
        return this.CategoriesService.addCategories();
    }
}
