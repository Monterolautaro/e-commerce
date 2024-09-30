import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/Users/users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
constructor(
    private readonly UsersRepository: UsersRepository,
    private readonly JwtService: JwtService
) {}

async signUp(user: CreateUserDto){
    const {confirmPassword, ...userData} = user

    const foundUser = await this.UsersRepository.getUserByEmail(userData.email)
    if(foundUser) throw new BadRequestException('email already exists')
    
    if(confirmPassword !== userData.password) throw new BadRequestException('passwords do not match')

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    if(!hashedPassword) throw new Error('password not hashed')
        
    await this.UsersRepository.createUser({...userData, password: hashedPassword})
    
    return {success: 'user created successfully'}
}


async signIn(user: LoginUserDto) {

    if(!user.email || !user.password) return 'data is required'
    const foundUser = await this.UsersRepository.getUserByEmail(user.email)

    if(!foundUser) throw new BadRequestException('invalid credentials')

    const isValidPassword = await bcrypt.compare(user.password, foundUser.password)

    if(!isValidPassword) throw new BadRequestException('invalid credentials')

    const userPayload = {sub: foundUser.user_id, name: foundUser.name, email: foundUser.email, id: foundUser.user_id, isAdmin: foundUser.isAdmin}
    const token = this.JwtService.sign(userPayload)
    return {success: "You're logged in successfully", token}
}
}
