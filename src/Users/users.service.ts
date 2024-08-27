import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "src/entities/users.entity";

@Injectable()
export class UsersService {
    constructor(private readonly UsersRepository: UsersRepository) {}

    getUsers(page: number, limit: number) {
        return this.UsersRepository.getUsers(page, limit);
    }

    getUser(id) {
        return this.UsersRepository.getUser(id)
    }

    async createUser(userData: Omit<User, 'user_id' | 'orders'>) {
        try {
            return await this.UsersRepository.createUser(userData)
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException()
        }   
            throw new InternalServerErrorException()
        } 
    }

    updateUser(id: string, userData: Omit<User, 'user_id' | 'orders'>) {
        return this.UsersRepository.updateUser(id, userData)
    }

    deleteUser(id) {
        return this.UsersRepository.deleteUser(id)
    }
};