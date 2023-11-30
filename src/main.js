import express from 'express';
import { connectDB } from './db.js';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';

const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(morgan('dev'))
app.use('/', authRouter)

connectDB()

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}\n${`http://localhost:${PORT}`}`);
})