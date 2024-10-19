import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        description: 'User name',
        example: 'John Doe'
    })
    @IsNotEmpty()
    @Length(3, 80)
    name: string;

    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'User email',
        example: 'example@bgmail.com'
    })
    @IsNotEmpty()
    email: string;   

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({
        description: 'User password, must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)',
        example: 'Hola123@'
    })
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).'
    })
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    address: string;

    @IsNotEmpty()
    @IsPhoneNumber('AR')
    phone: number;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    city: string;

    @IsEmpty()
    isAdmin?: boolean;
}