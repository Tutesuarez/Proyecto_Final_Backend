import { Router } from 'express'
import passport from 'passport'
import '../config/passport.js'
import { current, login, logout, register, validation, resetpassword, recoverpassword} from '../controller/session.controller.js'
import { passportCall } from '../middleware/session..middleware.js'
import { generateToken } from '../utils/tokengenerator.js'
import { findOneByEmail } from '../services/session.service.js'

const routerSession = Router()


routerSession.post('/login', login)
routerSession.get('/logout', logout)
routerSession.post('/register', register)
routerSession.post("/resetpassword", resetpassword)
routerSession.post("/recoverpassword", recoverpassword)
routerSession.post('/current', current)
routerSession.get('/validation', passportCall('jwt'), validation)



routerSession.get('/githubSignup'), passport.authenticate('githubSignup', { scope: ['user:email'] }), async (req, res) => { }
routerSession.get('/githubSignup', passport.authenticate('githubSignup', { failureRedirect: '/login' }),
    function (req, res) {
        req.session.user = req.user
        const user = findOneByEmail(req.user)
        const token = generateToken(user)
        res.cookie("tokenBE", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).redirect('/products')
    })

export default routerSession;