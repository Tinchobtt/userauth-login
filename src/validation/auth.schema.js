import { z } from 'zod'

export const registerSchema = z.object({
    uername: z.string({ 
        required_error: 'Username is required.' 
    }),

    email: z.string({ 
        required_error: 'Email is required.'
    }).email({ message: 'Invalid email.' }),

    password: z.string({
        required_error: 'Password is required'
    }).min(10, {message: 'Password must be at least 10 characters.'})
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required.'
    }).email({ message: 'Invalid email.' }),
    
    password: z.string({
        required_error: 'Password is required.'
    }).min(10, {message: 'Password must be at least 10 characters.'})
})