import { Router } from "express";
import { register, login, logout, profile  } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const authRouter = Router()

authRouter.post('/api/register', register)
authRouter.post('/api/login', login)
authRouter.get('/api/logout', logout)
authRouter.get('/api/profile', authRequired, profile)

export default authRouter