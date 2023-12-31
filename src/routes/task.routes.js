import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTask, getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validateData.js";
import { taskSchema } from "../validation/task.schema.js";

const taskRouter = Router()

taskRouter.get('/api/tasks', authRequired, getTasks)
taskRouter.get('/api/tasks/:id', authRequired, getTask)
taskRouter.post('/api/tasks', authRequired, validateSchema(taskSchema), createTask)
taskRouter.put('/api/tasks/:id', authRequired, updateTask)
taskRouter.delete('/api/tasks/:id', authRequired, deleteTask)


export default taskRouter