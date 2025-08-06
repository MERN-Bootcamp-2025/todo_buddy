import { Type } from 'class-transformer';
import { TodoStatus,Priority } from '../models/todo';
import { IsString, IsEmail, Matches, MinLength, MaxLength, IsNotEmpty, IsEnum, IsOptional, IsDate, IsArray, IsBoolean } from 'class-validator'

// export class UserDTO {
//     @IsEmail()
//     @IsNotEmpty()
//     @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid Email address' })
//     email: string;

//     @IsString()
//     @MinLength(4)
//     @MaxLength(20)
//     password: string;
// }


// export class UserSignupDTO {

//     @IsString()
//     name: string;

//     @IsEmail()
//     email: string;

//     @IsString()
//     @MinLength(6)
//     @MaxLength(15)
//     password!: string;

//     @IsEnum(UserRole)
//     role: UserRole;

//     @IsString()
//     @IsOptional()
//     invited_by?: string;


//     // @IsOptional()
//     // @IsString()
//     // phone_no?: string;

//     // @IsOptional()
//     // @IsString()
//     // address?: string;

//     // @IsOptional()
//     // @IsArray()
//     // @Type(() => Appointments)
//     // patientAppointments?: Appointments[];
// }



export class TodoAddDTO {

    @IsString()
    title: string;

    @IsEmail()
    description: string;

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    password!: string;

    @IsEnum(Priority)
    priority: Priority;
    
    @IsEnum(TodoStatus)
    status: TodoStatus;

    @IsString()
    @IsOptional()
    expected_completion_at?: Date;

    @IsString()
    user_id: string;

   @IsBoolean()
   is_deleted: boolean;

    // @IsOptional()
    // @IsString()
    // phone_no?: string;

    // @IsOptional()
    // @IsString()
    // address?: string;

    // @IsOptional()
    // @IsArray()
    // @Type(() => Appointments)
    // patientAppointments?: Appointments[];
}

