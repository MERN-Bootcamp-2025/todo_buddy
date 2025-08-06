import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
