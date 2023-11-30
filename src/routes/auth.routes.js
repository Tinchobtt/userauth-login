import { Router } from "express";
import { register, login, logout  } from "../controllers/auth.controllers.js";

const authRouter = Router()

authRouter.post('/api/register', register)
authRouter.post('/api/login', login)
authRouter.get('/api/logout', logout)

export default authRouter