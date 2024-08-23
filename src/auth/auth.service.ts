import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(private readonly AuthRepository: AuthRepository) {}

        getAuth(): string {
            return 'get Auth'
        }
        
        signIn(email: string, password: string) {
            return this.AuthRepository.signIn(email, password)
        }
}
