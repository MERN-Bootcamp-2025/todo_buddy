import { Type } from 'class-transformer';
import { TodoStatus,Priority } from '../models/todo';
import { IsString,  IsEnum, IsOptional,  IsBoolean } from 'class-validator'


export class TodoAddDTO {

    @IsString()
    title: string;

    @IsString()
    description: string;

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
   @IsOptional()
   is_deleted: boolean;


}


export class TodoUpdateDTO {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(Priority)
    priority: Priority;
    
    @IsEnum(TodoStatus)
    status: TodoStatus;

    @IsString()
    @IsOptional()
    expected_completion_at?: Date;

    @IsString()
    @IsOptional()
    user_id?: string;

   @IsBoolean()
   @IsOptional()
   is_deleted: boolean;


}