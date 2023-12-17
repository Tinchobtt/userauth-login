import { taskModel } from "../models/task.model.js"

export const getTasks = async (req, res) => {
    try{
        const tasks = await taskModel.find()
        if(!tasks){
            return res.status(404).json({message: 'Tasks not found.'})
        }
        res.status(200).json({message: tasks})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getTask = async (req, res) => {
    const id = req.params.id
    try{
        const task = await taskModel.findById(id).populate('user');
        if(!task){
            return res.status(404).json({message: 'Task not found.'})
        }
        res.status(200).json({message: task})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const createTask = async (req, res) => {
    const {title, description, date} = req.body
    try{
        const newTaks = new taskModel({title, description, date, user: req.user.payload._id})
        const taksSaved = await newTaks.save()
        
        if(!taksSaved){
            return res.status(400).json({message: 'Error trying to create the task.'})
        }
        res.status(200).json({message: taksSaved})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const updateTask = async (req, res) => {
    const id = req.params.id
    const {title, description, date} = req.body
    try{
        const task = await taskModel.findByIdAndUpdate(id, {title, description, date}/*, {new: true}*/); //El new: true es porque sino me devuelve el dato viejo sin update, con el true me devuelve la taks modificada
        if(!task){
            return res.status(404).json({message: 'Task not found.'})
        }
        res.status(200).json({message: task})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const deleteTask = async (req, res) => {
    const id = req.params.id
    try{
        const task = await taskModel.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message: 'Task not found.'})
        }
        res.status(200).json({message: 'Task deleted.'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}