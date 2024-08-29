import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Get()
    getAuth(): string {
        try {
            return this.AuthService.getAuth();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Get en auth fallido"
        }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('signIn')
    async signIn(@Body() user: LoginUserDto ) {
        try {
            return await this.AuthService.signIn(user)
        } catch (error) {
            throw new BadRequestException('Invalid credentials')
        }
    }

}
