import { Router } from 'express'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import { userModel } from '../controller/models/user.model.js'

const routerSession = Router()

routerSession.post('/register', async (req, res) => {
    const { first_name, last_name, email, gender, password } = req.body

    try {
        const exists = await userModel.findOne({ email })
        if (exists) return res.status(400).send({ status: 'error', error: 'user already exists' })

        const user = {
            first_name,
            last_name,
            email,
            gender,
            password: createHash(password)
        };

        await userModel.create(user)

        res.redirect('/login')
    } catch (error) {
        console.log(error)
        res.redirect('/errorsingup')
    }
});

routerSession.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password){
    console.log('Incomplete values')
     return res.redirect('/errorlogin')
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            console.log('User not found')
            return res.status(404).json({redirectURL: '/errorlogin'});
            //return res.redirect('/errorlogin')
        };

        if (!isValidPassword(user, password)) {
            console.log('Invalid credentials')
        return res.redirect('/errorlogin')
        }

        delete user.password

        req.session.user = user
        console.log(user)
        
        //user.isAdmin ? res.redirect('/perfil'): res.redirect('/')
  
        if (user.isAdmin === true) {
            res.status(200).json({redirectURL: '/perfil'});
          } else {
            res.status(200).json({redirectURL: '/'});
          }
        console.log('Login Success')
        return user
    } catch (error) {
        res.status(500).send({ status: 'error' })
    }
})

routerSession.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (!err){
            res.redirect("/login")
            console.log(' Session detroyed')
        }
        else
            res.render("/perfil", {
                title: "Registro",
                style: "home",
                user,
                logued: true,
                error: { message: err, status: true },
            })
    })
})

export default routerSession;