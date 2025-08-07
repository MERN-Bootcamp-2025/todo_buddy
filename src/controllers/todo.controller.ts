import { Request, Response } from "express";

import { TodoService ,} from "../services/todo.services";
import { TodoAddDTO,TodoUpdateDTO } from "../dto/todo.dto";
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export interface IValidationError {
    property: string;
    constraints: { [type: string]: string };
}

export class TodoController {

//   static async getTodo(req: Request, res: Response) {
//         try {
//           const { id } = req.params;
//           const user = await TodoService.getUserById(id);
    
//           if (!user) {
//             console.warn(`user not found with ID: ${id}`);
//             return res.status(404).json({ message: "user not found" });
//           }
    
//           return res.status(200).json(user);
//         } catch (error) {
//           console.error("Error fetching user by ID:", error);
//           return res.status(500).json({ message: "Internal server error" });
//         }
 
//   } 


 


   static async postTodo(req: Request, res: Response) {
            try {
                const dto = plainToClass(TodoAddDTO, req.body);
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
    
                const savedTodo = await TodoService.AddTodo(dto);
            
    
                return res.status(201).json({
                    success: true,
                    status:  201,
                    message: 'Todos Added!',
                    todo: savedTodo
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
    




 static async getTodoById(req: Request, res: Response) {
    try {
      const userId = req.params.id; 
      if (!userId) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "User ID  not found",
        });
      }

      const {
        page = 1,
        limit = 10,
        status,
        priority,
        title,
        from_date,
        to_date,
      } = req.query;

      const result = await TodoService.getTodoById(userId, {
        page: Number(page),
        limit: Number(limit),
        status: status as string,
        priority: priority as string,
        title: title as string,
        from_date: from_date as string,
        to_date: to_date as string,
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Todos get successfully",
        ...result,
      });
    } catch (error) {
      console.error("Error in getTodos:", error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to get todos",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
 static async getTodos(req: Request, res: Response) {
    try {
    
      const {
        page = 1,
        limit = 10,
        status,
        priority,
        title,
        from_date,
        to_date,
      } = req.query;

      const result = await TodoService.getTodos( {
        page: Number(page),
        limit: Number(limit),
        status: status as string,
        priority: priority as string,
        title: title as string,
        from_date: from_date as string,
        to_date: to_date as string,
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Todos get successfully",
        ...result,
      });
    } catch (error) {
      console.error("Error in getTodos:", error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to get todos",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async softDeleteTodo(req: Request, res: Response) {
  try {

    const userId = req.user.id;
    const { id } = req.params;
    const result = await TodoService.softDeleteTodo(id, userId);

    return res.status(200).json({
      success: true,
      status: 200,
      message: result.message,
    });
  } catch (error: any) {
    if (error.message === "Todo not found") {
      return res.status(404).json({
        success: false,
        status: 404,
        message: error.message,
      });
    }
    console.error(error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
}
  static async updateTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
     const userId = req.user.id;
     const dto = plainToClass(TodoUpdateDTO, req.body);
    const result = await TodoService.updateTodo(id, userId, dto);
    return res.status(200).json({
      success: true,
      status: 200,
      message: result.message,
    });
  } catch (error: any) {
    if (error.message === "Todo not found") {
      return res.status(404).json({
        success: false,
        status: 404,
        message: error.message,
      });
    }
    console.error(error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
}

  static async patchTodo(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const todoId = req.params.id;
      const dto: Partial<TodoAddDTO> = req.body;

      const updatedTodo = await TodoService.updatePartialTodo(
        userId,
        todoId,
        dto
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update todo", error });
    }
  }

}
