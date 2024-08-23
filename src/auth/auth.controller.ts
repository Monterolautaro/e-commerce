import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Get()
    getAuth(): string {
        return this.AuthService.getAuth();
    }

    @Post()
    signIn(@Body() credentials ) {
        const { email, password } = credentials

        return this.AuthService.signIn(email, password)
    }
}
