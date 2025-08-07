import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { authentification } from "../middleware/auth.middleware";

const Router = express.Router();


Router.post("/signup", AuthController.signup);
Router.post("/login", AuthController.login);
Router.post("/invite", authentification,UserController.postInvite);
// Router.get("/users", UserController.getUsers);


export { Router as userRouter };
