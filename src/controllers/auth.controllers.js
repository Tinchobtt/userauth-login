import 'dotenv/config'
import { userModel } from "../models/user.model.js"
import { createHash, validatePassword } from "../utils/bcrypt.js"
import { generateToken } from "../utils/jwt.js"
import Jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const {username, email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user) return res.status(400).json({message: 'The email already exists.'})

        const passwordHash = createHash(password)
        const newUser = new userModel({username, email, password: passwordHash})
        const userSaved = await newUser.save() //Haciendo el guardado de esta forma, si hay algun error obtendremos un error mas detallado en el catch

        if(newUser && userSaved){
            const token = await generateToken(userSaved)
    
            res.cookie('jwtCookie', token, { maxAge: 43200000  })
            return res.json({
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createAt: userSaved.createdAt,
                updateAt: userSaved.updatedAt
            })
        }
        res.status(400).json({message: 'Error trying to create the User'})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({message: 'User not found.'})
        }
        const isMatch = validatePassword(password, user.password)

        if(isMatch){
            const token = await generateToken(user)
            res.cookie('jwtCookie', token, { maxAge: 43200000 })
            return res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                createAt: user.createdAt,
                updateAt: user.updatedAt
            })
        }
        res.status(401).json({message: 'Invalid credentials'})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const logout = (req, res) => {
    res.clearCookie('jwtCookie')
    res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
    const { jwtCookie } = req.cookies

    if(!jwtCookie) return res.status(401).json({message: 'Unauthorized'})

    Jwt.verify(jwtCookie, process.env.JWT_SECRET, async (err, credentials) => {
        if(err) return res.status(401).json({message: 'Unauthorized.'})
        
        const user = await userModel.findById(credentials.payload._id)
        if(!user) return res.status(401).json({message: 'Unauthorized.'})

        return res.status(200).json({message: user})
    })
}

export const profile = async (req, res) => {
    const user = await userModel.findById(req.user.payload._id)
    if(!user) return res.status(401).json({message: 'User not found.'})
    return res.status(200).json({message: user})
}