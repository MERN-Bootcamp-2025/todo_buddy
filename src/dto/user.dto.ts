import { Type } from 'class-transformer';
import { UserRole } from '../models/user';
import { IsString, IsEmail, Matches, MinLength, MaxLength, IsNotEmpty, IsEnum, IsOptional, IsDate, IsArray, IsBoolean } from 'class-validator'

export class UserDTO {
    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid Email address' })
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}


export class UserSignupDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    password!: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    @IsOptional()
    invited_by?: string;

}



export class UserAddDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    password!: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    @IsOptional()
    invited_by?: string;

    @IsEmail()
    from_email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    @IsOptional()
    from_password!: string;

 
}

