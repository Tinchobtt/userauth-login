import 'dotenv/config'
import Jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
    const token = req.cookies['jwtCookie'];
    if(!token) return res.status(401).json({message: 'Unauthorized user.'})

    Jwt.verify(token, process.env.JWT_SECRET, (error, credential) => {
        if(error) return res.status(403).json({message: 'Invalid token.'});
        req.user = credential
        next()
    })
}