import { BadRequestException, Injectable, NotFoundException, PayloadTooLargeException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";

let id = 3;

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async getUsers(page: number, limit: number) {
        const skip = (page - 1)*limit;

        const users = await this.userRepository.find({
            take: limit,
            skip: skip
        });

        const usersNoPassword = users.map(({password, ...userNoPassword}) => userNoPassword)

        return usersNoPassword
    }

    async getUser(id: string) {
        try {
            const user: User = await this.userRepository.findOne({
                where: { user_id: id },
                relations: {
                    orders: true
                }
            })
            const {password, ...userNoPassword } = user
            return userNoPassword
        } catch (error) {
            throw new NotFoundException('User not found')
        }
    }

    
    async createUser(userData: Omit<User, 'user_id' | 'orders' | 'isAdmin'>): Promise<Partial<User>>{
        const newUser: User = await this.userRepository.save(userData)
        const { password, ...userNoPassword } = newUser
        
        return userNoPassword;
    }
    
    async updateUser(id: string, userData: Omit<User, 'user_id' | 'orders' | 'isAdmin'>): Promise<Partial<User>> {
        await this.userRepository.update(id, userData)
        const updatedUser = await this.userRepository.findOneBy({ user_id: id })
        const { password, ...userNoPassword } = updatedUser;
        
        return userNoPassword;
    }
    
    async deleteUser(id: string): Promise<Partial<User>> {

        const user = await this.userRepository.findOneBy({ user_id: id });
        
        if(!user) throw new NotFoundException('User not found')
        
        try {

            await this.userRepository.remove(user)
    
            const { password, ...userNoPassword } = user;
            
            return userNoPassword;

        } catch (error) {

            throw new BadRequestException('Para eliminar un usuario se deben borrar todas sus ordenes', error)

        }
    }
    
    async getUserByEmail(email: string) {

        const user = await this.userRepository.findOne({
            where: { email }
        })

        return user
    }

//     setAdmin(id){

//         const user = this.userRepository.findOneBy({ user_id: id })
//         user.isAdmin = true
//         this.userRepository.save(user)
//         return
//     }

// 
}