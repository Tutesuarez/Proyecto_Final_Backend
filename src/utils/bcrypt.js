import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import "dotenv/config"



export const createHash = password => {return bcrypt.hashSync(password, bcrypt.genSaltSync())};

export const isValidPassword = (user, password) => {return bcrypt.compareSync(password, user.password)};

export const generateToken = (user)=>{
    const token = jwt.sign({user},process.env.SECRET_JWT, {expiresIn:'1h' })
    return token
}