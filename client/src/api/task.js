import axios from "./axios";

const API = 'http://localhost:3000/api'

export const getTasksRequest = () => axios.get(`${API}/tasks`)
export const getTaskByIdRequest = id => axios.get(`${API}/tasks/${id}`)
export const createTaskRequest = task => axios.post(`${API}/tasks`, task)
export const updateTaskRequest = task => axios.put(`${API}/tasks/${task._id}`, task)
export const deleteTaskRequest = id => axios.delete(`${API}/tasks/${id}`)