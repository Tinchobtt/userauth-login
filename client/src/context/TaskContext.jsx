import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from '../api/task.js'

export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    
    if(!context) throw new Error("useTask must be used within an TaskProvider")
    return context
}

const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([])
    
    const getTasks = async () => {
        try{
            const res = await getTasksRequest()
            setTasks(res.data.message)
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }

    const createTask = async (task) => {
        try{
            await createTaskRequest(task)
        }catch(error){
            console.log(error);
        }
    } 

    return(
        <TaskContext.Provider 
            value={{
                tasks,
                createTask,
                getTasks
            }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider