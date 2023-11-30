import 'dotenv/config'
import Jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    return new Promise( (res, rej) => {
        Jwt.sign({payload}, process.env.JWT_SECRET, {expiresIn: '12h'}, 
        (error, token) => {
            if(error) rej(error);
            res(token)
        })
    })
}