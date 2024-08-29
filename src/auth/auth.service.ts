import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly AuthRepository: AuthRepository) {}

        getAuth(): string {
            return 'get Auth'
        }

        async signUp(user){
            return await this.AuthRepository.signUp(user);
        }
        
        async signIn(user) {
            
            return await this.AuthRepository.signIn(user)
            
        }

}
