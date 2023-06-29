import jwt from 'jsonwebtoken'
import "dotenv/config"

export const jwtValidation = (req, res, next) => {
    const authorizationHeader = req.get('Authorization')
    const token = authorizationHeader.split(' ')[1]
    console.log(token);

    try {
        const isValidToken = jwt.verify(token, process.env.SECRET_JWT)
        req.user = isValidToken.user
        next()
    } catch (error) {
        res.status(401).json({ message: 'authorization error' })
    }
}