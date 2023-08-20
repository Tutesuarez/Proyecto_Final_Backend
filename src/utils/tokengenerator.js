import jwt from 'jsonwebtoken'
import config from "../config/config.js"

const jwt_code= config.secret_jwt
export const generateToken = (user)=>{
    const token = jwt.sign({user},jwt_code , {expiresIn:'1d' })
    console.log(token);
    return token
}