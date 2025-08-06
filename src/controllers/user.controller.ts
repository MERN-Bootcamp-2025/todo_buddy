import { Request, Response } from "express";
import { PostgresDataSource } from "../config/database";
import { User } from "../models/user";
import { encrypt } from "../helpers/encrypt";
import { UserService } from "../services/user.services";
import { UserAddDTO, } from "../dto/user.dto";
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export interface IValidationError {
    property: string;
    constraints: { [type: string]: string };
}

export class UserController {

  static async getUser(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const user = await UserService.getUserById(id);
    
          if (!user) {
            console.warn(`user not found with ID: ${id}`);
            return res.status(404).json({ message: "user not found" });
          }
    
          return res.status(200).json(user);
        } catch (error) {
          console.error("Error fetching user by ID:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
 
  } 

   static async postInvite(req: Request, res: Response) {
            try {
                console.log("Body", req.body);
                const dto = plainToClass(UserAddDTO, req.body);
                const validationErrors: ValidationError[] = await validate(dto);
                if (validationErrors.length > 0) {
                    const errors: IValidationError[] = validationErrors.map((error) => ({
                        property: error.property,
                        constraints: error.constraints || {},
                    }));
                    return res.status(400).json({
                        success: false,
                        status:  400,
                        message: 'User Registration failed',
                        error: 'Invalid input data',
                        validationErrors: errors
                    });
                }
    
                const savedUser = await UserService.invite(dto);
                if (!savedUser) {
                    return res.status(201).json({
                        success: false,
                        status:  201,
                        message: "USer Already Exist with this email"
                    })
                }
    
                return res.status(201).json({
                    success: true,
                    status:  201,
                    message: 'User Registration successful',
                    user: savedUser
                });
    
            } catch (error) {
                console.log('error', error)
                return res.status(500).json({
                    status:  500,
                    success: false,
                    message: 'Internal server error'
                });
            }
        }
    

static async getUsers(req: Request, res: Response) {
     
        try {
          const user = await UserService.getUsers();
          if (!user) {
            return res.status(404).json({ message: "user not found" });
          }
    
          return res.status(200).json(user);
        } catch (error) {
          console.error("Error fetching user by ID:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
 
  }


}
