import { useEffect } from "react"
import { useTasks } from "../context/TaskContext"

const TaskPage = () => {
    const { getTasks, tasks } = useTasks()

    useEffect( ()=>{
        getTasks()
    }, [])
    
    return (
        <>
        {tasks.length != 0 ? (
            tasks.map(task => {
                return <div key={task._id} className="bg-zinc-800 p-4 ">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            })
        ): (
            <h1>No hay tareas</h1>
        )}
        </>
    )
}

export default TaskPage