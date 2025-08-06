import { Request, Response } from 'express'
import { UserService } from '../services/user.services';
import { UserDTO, UserSignupDTO, UserAddDTO } from '../dto/user.dto';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
require('dotenv').config();

export interface IValidationError {
    property: string;
    constraints: { [type: string]: string };
}

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const dto = plainToClass(UserDTO, req.body);
            const validationErrors: ValidationError[] = await validate(dto);
            if (validationErrors.length > 0) {
                const errors: IValidationError[] = validationErrors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints || {},
                }));
                return res.status(400).json({
                    success: false,
                    status:  400,
                    message: 'Validation failed',
                    error: 'Invalid input data',
                    validationErrors: errors
                });
            }
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ 
                    status:  400,
                    message: "Email and password required"
                 });
            }

            const { userId, accessToken, user } = await UserService.login(email, password);
            return res.status(200).json({ 
                message: "Login successful",
                accessToken,
                user,
                status: 200,
             });

        } catch (error) {
            console.error(error);

            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                return res.status(401).json({ 
                    status:  401,
                    message: error.message
                 });
            }
            return res.status(500).json({ 
                message: "Internal server error",
                status:  500, 
            });
        }
    }


    static async signup(req: Request, res: Response) {
        try {
            const dto = plainToClass(UserSignupDTO, req.body);
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

            const savedUser = await UserService.signup(dto);
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

}