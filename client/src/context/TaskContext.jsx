import { createContext, useContext } from "react";

const TaskContext = createContext()

const useTask = () => {
    const context = useContext(TaskContext)

    if(!context) throw new Error("useTask must be used within an TaskProvider")
    return context
}
const TaskProvider = ({children}) => {
    return(
        <TaskContext.Provider value={{

        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider