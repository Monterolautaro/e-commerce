import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createUser.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto extends PickType(
    CreateUserDto, ['email', 'password'] as const) {
    
    @ApiProperty({
        description: 'User email',
        example: 'example@gmail.com',
    })
    email: string;

    @ApiProperty({
        description: 'User password, must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)',
        example: 'Hola123@',
    })
    password: string;
}
