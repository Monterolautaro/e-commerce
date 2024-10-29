import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/authguard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getCategories(){
        return this.CategoriesService.getCategories();
    }

    @Get('seeder')
    addCategories(){
        return this.CategoriesService.addCategories();
    }
}
