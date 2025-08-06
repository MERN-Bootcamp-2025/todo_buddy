import express, { Router } from 'express';
import cors from 'cors';
import { PostgresDataSource } from './config/database';
import { Request, Response } from "express";
// import { userRouter } from "./routes/user.routes";
// import appointmentsRouter from './routes/appointments.routes';
// import { movieRouter } from "./routes/movie.routes";
// import "reflect-metadata";
// import { request } from 'http';
// import { errorHandler } from './middleware/error.middleware';
// import router from './routes/hospital.routes';

const app = express()
app.use(express.json());
app.use(cors());
// app.use("/auth", userRouter);
// app.use("/hospitals", router)
// app.use('/appointments', appointmentsRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" });
});

app.use((req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" });
})

PostgresDataSource.initialize().then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT, () => {
        console.log(`server start on port no ${process.env.PORT}`);
    });
}).catch((error) => console.error('Error connecting to database:', error));