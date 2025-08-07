import * as express from "express";
import { TodoController } from "../controllers/todo.controller";
import { authentification } from "../middleware/auth.middleware";

const Router = express.Router();


Router.post("/todos", authentification, TodoController.postTodo);
Router.get("/todos/:id", authentification, TodoController.getTodoById);
Router.get("/todos", authentification, TodoController.getTodos);
Router.put("/todos/:id", authentification, TodoController.updateTodo); 
Router.patch('/todos/:id', authentification, TodoController.patchTodo);
Router.delete("/todos/:id", authentification, TodoController.softDeleteTodo);


export { Router as todoRouter };


