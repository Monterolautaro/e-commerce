import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/Users/users.repository';

@Injectable()
export class AuthRepository {
constructor(private readonly UsersRepository: UsersRepository) {}

async signIn(email: string, password: string) {
if(!email || !password) return 'data is required'

const user = await this.UsersRepository.getUserByEmail(email)

if(!user) return 'user not found';

if(user.password === password) return 'you re logged in';

return 'invalid credentials';
}
}
