import { Request, Response } from "express";
import { PostgresDataSource } from "../config/database";
import { User } from "../models/user";
import { encrypt } from "../helpers/encrypt";
import { UserService } from "../services/user.services";

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
