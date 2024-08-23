import { Injectable } from "@nestjs/common";
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

    createUser(userData: User) {
        return this.UsersRepository.createUser(userData)
    }

    updateUser(id: string, userData: User) {
        return this.UsersRepository.updateUser(id, userData)
    }

    deleteUser(id) {
        return this.UsersRepository.deleteUser(id)
    }
};