import { BadRequestException, Body, ConflictException, Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { ValidateInterceptor } from 'src/Users/structureValidation.interceptor';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiExtraModels(LoginUserDto)
@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    // @Get()
    // getAuth(): string {
    //     try {
    //         return this.AuthService.getAuth();
    //     } catch (error) {
    //         throw new HttpException({
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             error: "Get en auth fallido"
    //     }, HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    @HttpCode(201)
    @Post('signUp')
    @UseInterceptors(ValidateInterceptor)
    async createUser(@Body() userData: CreateUserDto) {
        try {
            return await this.AuthService.signUp(userData)
        } catch (error) {
            if(error instanceof ConflictException) {
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: {message: 'Some credentials already exists'} }, HttpStatus.CONFLICT)
            }
            throw new InternalServerErrorException(error.message)
        }
    }



    @Post('signIn')
    @ApiBody({type: LoginUserDto})
    async signIn(@Body() user: LoginUserDto ) {
        try {
            return await this.AuthService.signIn(user)
        } catch (error) {
            throw new BadRequestException('Invalid credentials')
        }
    }

}
