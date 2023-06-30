import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const jwtValidation = (req, res, next) => {
    const authorizationHeader = req.get('Authorization')
    const token = authorizationHeader.split(' ')[1]
    console.log(token);

    try {
        const isValidToken = jwt.verify(token, config.secret_jwt)
        req.user = isValidToken.user
        next()
    } catch (error) {
        res.status(401).json({ message: 'authorization error' })
    }
}