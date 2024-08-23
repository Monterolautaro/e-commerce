import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Response, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PasswordInterceptor } from "./PasswordInterceptor.interceptor";
import { ValidateInterceptor } from "./structureValidation.interceptor";
import { AuthGuard } from "src/auth/authguard.guard";
import { User } from "src/entities/users.entity";


@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @HttpCode(200)
    @Get()
    @UseInterceptors(PasswordInterceptor)
    @UseGuards(AuthGuard)
    getUsers(@Query('page') page:number = 1, @Query('limit') limit: number = 5) {
        if(page && limit) return this.UsersService.getUsers(page, limit)

        return this.UsersService.getUsers(page, limit)
    }

    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(PasswordInterceptor)
    getUser(@Param('id') id: string) {
        return this.UsersService.getUser(id)
    }

    @HttpCode(201)
    @Post()
    @UseInterceptors(ValidateInterceptor)
    createUser(@Body() userData: User) {
        return this.UsersService.createUser(userData)
    }

    @HttpCode(200)
    @Put(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(ValidateInterceptor)
    updateUser(@Param('id') id: string, @Body() userData: User) {
        return this.UsersService.updateUser(id, userData)
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.UsersService.deleteUser(id)
    }
}