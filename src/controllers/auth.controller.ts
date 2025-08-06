import { Request, Response } from 'express'
import { UserService } from '../services/user.services';
import { UserDTO, UserSignupDTO } from '../dto/user.dto';
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
                    message: 'Validation failed',
                    error: 'Invalid input data',
                    validationErrors: errors
                });
            }
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }

            const { userId, accessToken, user } = await UserService.login(email, password);
            return res.status(200).json({ message: "Login successful", userId, accessToken,user });

        } catch (error) {
            console.error(error);

            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
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
                    message: 'User Registration failed',
                    error: 'Invalid input data',
                    validationErrors: errors
                });
            }

            const savedUser = await UserService.signup(dto);
            if (!savedUser) {
                return res.status(201).json({
                    success: false,
                    message: "USer Already Exist with this email"
                })
            }

            return res.status(201).json({
                success: true,
                message: 'User Registration successful',
                user: savedUser
            });

        } catch (error) {
            console.log('error', error)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

}