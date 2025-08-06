import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {

    console.log('error', err);
    res.status(500).json({
        message: "Internal server error"
    })
}