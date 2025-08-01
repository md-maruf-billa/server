import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import customDomainMapper from './app/middlewares/custom_domain_mapper';
import globalErrorHandler from './app/middlewares/global_error_handler';
import notFound from './app/middlewares/not_found_api';
import appRouter from './routes';

// define app
const app = express()

// middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://www.store.oyoubuilder.com",
        "https://store.oyoubuilder.com",
        "https://www.oyoubuilder.com",
        "https://oyoubuilder.com"
    ],
    credentials: true
}))
app.use(express.json({ limit: "100mb" }))
app.set('trust proxy', true);
app.use(express.raw())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(customDomainMapper)
app.use("/api", appRouter)

// stating point
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running successful !!',
        data: null,
    });
});

// global error handler
app.use(globalErrorHandler);
app.use(notFound);

// export app
export default app;