import { Body, ConflictException, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Param, ParseUUIDPipe, Post, Put, Query, Response, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PasswordInterceptor } from "./PasswordInterceptor.interceptor";
import { ValidateInterceptor } from "./structureValidation.interceptor";
import { AuthGuard } from "src/auth/authguard.guard";
import { User } from "src/entities/users.entity";
import { CreateUserDto } from "src/dto/createUser.dto";


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
    getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.UsersService.getUser(id)
    }

    @HttpCode(201)
    @Post()
    @UseInterceptors(ValidateInterceptor)
    async createUser(@Body() userData: CreateUserDto) {
        try {
            return await this.UsersService.createUser(userData)
        } catch (error) {
            if(error instanceof ConflictException) {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: {message: 'Some credentials already exists'} }, HttpStatus.CONFLICT)
            }
            throw new InternalServerErrorException(error.message)
        }
    }

    @HttpCode(200)
    @Put(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(ValidateInterceptor)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() userData: CreateUserDto) {
        return this.UsersService.updateUser(id, userData)
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.UsersService.deleteUser(id)
    }
}