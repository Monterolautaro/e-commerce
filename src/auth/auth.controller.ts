import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/loginUser.dto';

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

    @Post('signin')
    async signIn(@Body() credentials: LoginUserDto ) {
            const { email, password } = credentials
            const user = await this.AuthService.signIn(email, password)
            
            if(!user) throw new NotFoundException('Invalid Credentials In Auth')

            return user;
    }

}
