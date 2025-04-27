import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// import client from "prom-client"; // metric monitoring
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

// // prom-client
// const clientDefaultMetrics = client.collectDefaultMetrics
// clientDefaultMetrics({ register: client.register })




import { PrismaClient } from '@prisma/client';

import cookieParser from 'cookie-parser';


const app: Application = express();
export const prisma = new PrismaClient()

// app.get('/metrics', async (req, res) => {
//   res.set('Content-Type', client.register.contentType)
//   const metrics = await client.register.metrics()
//   res.json({ metrics }).status(200)
// })

app.use(cors({
  credentials: true
}));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
