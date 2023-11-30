import express from 'express';
import { connectDB } from './db.js';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import tasksRouter from './routes/task.routes.js';

const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(cookieParser())
app.use(morgan('dev'))

//Routes
app.use('/', authRouter)
app.use('/', tasksRouter)

connectDB()

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}\n${`http://localhost:${PORT}`}`);
})