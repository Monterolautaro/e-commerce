import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        description: 'User name',
        example: 'Gustavo'
    })
    @IsNotEmpty()
    @Length(3, 80)
    name: string;

    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'User email',
        example: 'example@gmail.com'
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
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @ApiProperty({
        description: 'User password, must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)',
        example: 'Hola123@'
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).'
    })
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    @ApiProperty({
        description: 'User address',
        example: 'Calle falsa 123'
    })
    address: string;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty({
        description: 'User birthday',
        example: '18-04-2000'
    })
    birthday: Date

    @IsNotEmpty()
    @IsPhoneNumber('AR')
    @ApiProperty({
        description: 'User phone number',
        example: "+5492994561836"
    })
    phone: number;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    @ApiProperty({
        description: 'User country',
        example: 'Argentina'
    })
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    @ApiProperty({
        description: 'User city',
        example: 'Buenos Aires'
    })
    city: string;

    // @ApiHideProperty()
    // @IsEmpty()
    // isAdmin?: boolean;
}