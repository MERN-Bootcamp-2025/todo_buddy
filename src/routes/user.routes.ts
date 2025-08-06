import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";

const Router = express.Router();

///auth/login
Router.post("/signup", AuthController.signup);

//auth/signup
Router.post("/login", AuthController.login);

// //auth/change-password
// Router.post("/change-password/:uid", UserController.changePassword);

// Router.get("/users/:id", UserController.getUser);
// Router.get("/users", UserController.getUsers);


export { Router as userRouter };
