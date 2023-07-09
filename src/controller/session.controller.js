import { createHash, isValidPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/tokengenerator.js'
import { userModel } from '../persistence/models/user.model.js'
import config from '../config/config.js'
import '../config/passport.js'
import '../services/session.service.js'
import { findOneByEmail } from '../services/session.service.js'

export const login = async(req, res)=>{
    const { email, password } = req.body;
    
    if (!email || !password) {
        console.log('Incomplete values')
        return res.json({ redirectURL: '/errorlogin' })
    }
    
    try {
        if (req.body.email === config.admin_email && req.body.password === config.admin_password) {
            req.session.user = {
                first_name: 'Coder',
                last_name: 'House',
                gender: '',
                email: req.body.email,
                password: req.body.password,
                isAdmin: true
            }
            return res.status(200).json({ redirectURL: '/perfil' });
        }
        const user = await findOneByEmail(email)
        if (!user) {
            console.log('User not found')
            return res.status(404).json({ redirectURL: '/errorlogin' });
            
        };
        if (!isValidPassword(user, password)) {
            console.log('Invalid credentials')
            return res.json({ redirectURL: '/errorlogin' })
        }
        delete user.password
        req.session.user = user
        console.log(user)
        
        if (user.isAdmin === true) {
            res.status(200).json({ redirectURL: '/perfil' });
        } else {
            res.status(200).json({ redirectURL: '/' });
        }
        console.log('Login Success')
        return user
    } catch (error) {
        res.status(500).send({ status: 'error' })
    }
}

export const register = async(req, res)=>{
    const { first_name, last_name, email, gender, password } = req.body

    try {
        const exists = await findOneByEmail(email)
        if (exists) return res.status(400).send({ status: 'error', error: 'user already exists' })

        const user = {
            first_name,
            last_name,
            email,
            gender,
            password: createHash(password)
        }

        await userModel.create(user)

        res.redirect('/login')
    } catch (error) {
        console.log(error)
        res.redirect('/errorsingup')
    }
}

export const logout = async(req, res)=>{
    req.session.destroy((err) => {
        if (!err) {
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
}

export const current = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        console.log('Incomplete values')
        return res.json({ redirectURL: '/errorlogin' })
    }
    
    try {
        if (req.body.email === config.admin_email && req.body.password === config.admin_password) {
            req.session.user = {
                first_name: 'Coder',
                last_name: 'House',
                gender: '',
                email: req.body.email,
                password: req.body.password,
                isAdmin: true
            }
            const user = req.session.user
            const token = generateToken(user)
            console.log(user);
            return res.status(200).json({message: 'login', token });
        }
        const user = await findOneByEmail(email)
        if (!user) {
            console.log('User not found')
            return res.status(404).json({ redirectURL: '/errorlogin' });
            
        };
        if (!isValidPassword(user, password)) {
            console.log('Invalid credentials')
            return res.json({ redirectURL: '/errorlogin' })
        }
        delete user.password
        req.session.user = user
        console.log(user)
        
        if (user.isAdmin === true) {
            const token = generateToken(user)
            res.status(200).json({ message: 'login', token })
        } else {
            res.status(200).json({ message: 'login', token })
        }
        console.log('Login Success')
        return user
    } catch (error) {
        res.status(500).send({ status: 'error' })
    }

}

export const validation = (req, res) => {
    const { email } = req.user
    res.send(`Email ${email}`)
    
}

export const destroySession=(req, res, next)=>{
    if (req.session.login) {
        req.session.destroy(()=>{
            res.status(200).json({message: 'session destroyed'})
        })
    }
}

export const getSession=(req, res, next)=>{
    if (req.session.login) {
        res.status(200).json({message: ' Active session'})
    }else{
        res.status(401).json({message: ' Active session'})
    }
}