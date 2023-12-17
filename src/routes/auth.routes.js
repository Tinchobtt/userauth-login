import { Router } from "express";
import { register, login, logout, profile  } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateData.js";
import { registerSchema, loginSchema } from "../validation/auth.schema.js";

const authRouter = Router()

authRouter.post('/api/register', validateSchema(registerSchema), register)
authRouter.post('/api/login', validateSchema(loginSchema), login)
authRouter.get('/api/logout', logout)
authRouter.get('/api/profile', authRequired, profile)

export default authRouter