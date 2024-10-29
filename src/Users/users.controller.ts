import { Body, ConflictException, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Param, ParseUUIDPipe, Post, Put, Query, Req, Response, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PasswordInterceptor } from "./PasswordInterceptor.interceptor";
import { ValidateInterceptor } from "./structureValidation.interceptor";
import { AuthGuard } from "src/auth/authguard";
import { CreateUserDto } from "src/dto/createUser.dto";
import { AuthService } from "src/auth/auth.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/auth/roles.guard";


@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService,
                private readonly AuthService: AuthService,
    ) {}

    @HttpCode(200)
    @Get()
    @Roles(Role.Admin)
    @UseInterceptors(PasswordInterceptor)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page:number = 1, @Query('limit') limit: number = 5) {
        if(page && limit) return this.UsersService.getUsers(page, limit)

        return this.UsersService.getUsers(page, limit)
    }

    @HttpCode(200)
    @Get(':id')
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(PasswordInterceptor)
    getUser(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return this.UsersService.getUser(id)
            
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'User not found' }, HttpStatus.NOT_FOUND)
        }
    }

    @HttpCode(200)
    @Put(':id')
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(ValidateInterceptor)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() userData: CreateUserDto) {
        return this.UsersService.updateUser(id, userData)
    }

    @HttpCode(200)
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.UsersService.deleteUser(id)
    }

    // @Put(':id')
    // @UseGuards(AuthGuard)
    // setAdmin (@Param('id', ParseUUIDPipe) id: string) {
    //     return this.UsersService.setAdmin(id)
    // }
}