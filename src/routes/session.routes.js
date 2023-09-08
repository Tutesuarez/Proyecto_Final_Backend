import { Router } from 'express'
import passport from 'passport'
import '../config/passport.js'
import { current, login, logout, register, validation, resetpassword, recoverpassword, changeRole} from '../controller/session.controller.js'
import { passportCall } from '../middleware/session..middleware.js'

const routerSession = Router()


routerSession.post('/login', login)
routerSession.get('/logout', logout)
routerSession.post('/register', register)
routerSession.post("/resetpassword", resetpassword);
routerSession.post("/recoverpassword", recoverpassword);
routerSession.post('/current', current)
routerSession.get('/validation', passportCall('jwt'), validation)



routerSession.get('/githubSignup'), passport.authenticate('githubSignup', { scope: ['user:email'] }), async (req, res) => { }
routerSession.get('/githubSignup', passport.authenticate('githubSignup', { failureRedirect: '/login' }),
    function (req, res) {
        req.session.user = req.user;
        res.redirect('/')
    })

routerSession.get('/GoogleSignup', passport.authenticate('GoogleStrategy',{ scope: ['user:email'] }))
routerSession.get('/google', passport.authenticate('GoogleStrategy',{failureRedirect: '/login'}),
function (req, res) {
    req.session.user = req.user;
    res.redirect('/')
})


export default routerSession;