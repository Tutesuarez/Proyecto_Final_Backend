import { createHash, isValidPassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/tokengenerator.js'
import { userModel } from '../persistence/models/user.model.js'
import config from '../config/config.js'
import '../config/passport.js'
import '../services/session.service.js'
import { changePassword, findOneByEmail, recoverPass, roleChanger } from '../services/session.service.js'
import { codeGenerator } from './ticket.controller.js'
import { transporter } from '../utils/nodemailer.js'
import { logger } from '../utils/logger.js';
import { findById } from '../services/user.service.js'
import { addCart } from '../services/cart.service.js'
import { setLastConnection } from '../services/user.service.js'


export const login = async (req, res) => {
    const { email, password } = req.body
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
                role: 'admin'
            }
            return res.status(200).json({ redirectURL: '/perfil' });
        }
        const user = await findOneByEmail(email)
        console.log(user)
        if (!user) {
            console.log('User not found')
            return res.status(401).send({ status: 'error', error: 'User not found', redirectURL: '/errorlogin' })
        }

        if (!isValidPassword(user, password)) {
            console.log('Invalid credentials')
            return res.status(401).send({ status: 'error', error: 'User or Password are wrong', redirectURL: '/errorlogin' })
        }
        logger.info(`INFO => ${new Date()} - ${user.email} had log`);

        delete user.password
        req.session.user = user
        await setLastConnection(user._id)
        const token = generateToken(user)
        res.cookie("tokenBE", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ status: 'success', redirectURL: '/perfil' })
        return user;
    } catch (error) {
        res.status(500).send({ status: 'error' });
    }
}

export const register = async (req, res) => {
    const { first_name, last_name, email, gender, password } = req.body
    try {
        const exists = await findOneByEmail(email)
        if (exists) return res.status(400).send({ status: 'error', error: 'user already exists' })

        let resp = await addCart()
        const user = {
            first_name,
            last_name,
            email,
            gender,
            password: createHash(password),
            cart: { _id: resp._id },
            role: "user",
        }
        await userModel.create(user)
        res.redirect('/login')
    } catch (error) {
        console.log(error)
        res.redirect('/errorsingup')
    }
}

export const logout = async (req, res) => {
    const { user } = req.session
    await setLastConnection(user._id);
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie("tokenBE").redirect("/login")
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
    const { email, password } = req.body

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
                role: 'admin'
            }
            const user = req.session.user
            const token = generateToken(user)
            return res.status(200).json({ message: 'login', token });
        }
        const user = await findOneByEmail(email)
        if (!user) {
            console.log('User not found')
            return res.status(404).json({ redirectURL: '/errorlogin' });
        }

        if (!isValidPassword(user, password)) {
            console.log('Invalid credentials')
            return res.json({ redirectURL: '/errorlogin' })
        }

        delete user.password
        req.session.user = user

        if (user.role === 'admin') {
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

export const destroySession = (req, res, next) => {
    if (req.session.login) {
        req.session.destroy(() => {
            res.status(200).json({ message: 'session destroyed' })

        })
    }
}

export const getSession = (req, res, next) => {
    if (req.session.login) {
        res.status(200).json({ message: ' Active session' })
    } else {
        res.status(401).json({ message: ' Active session' })
    }
}

export const resetpassword = async (req, res) => {
    let { email, newpassword } = req.body
    const user = await findOneByEmail(email)
    if (user?.error)
        return res.status(401).send({ error: `User not found` })
    if (isValidPassword(user, newpassword))
        return res.send({ error: `The new password must be different to the old` })
    newpassword = createHash(newpassword)
    let resp = await changePassword({ email, newpassword })
    resp?.error
        ? res.status(400).send({ error: res.error })
        : res.send({
            success: `Password modified succesfully. Please go to login.`,
        })
}

export const recoverpassword = async (req, res) => {
    let { email } = req.body
    const user = await findOneByEmail(email)
    if (user?.error)
        return res.status(401).send({ error: `User not found` })
    user.recover_password = {
        id_url: codeGenerator(),
        createTime: new Date(),
    }
    await recoverPass(user)
    user.recover_password.id_url
    let result = await transporter.sendMail({
        from: "FASHION",
        to: email,
        subject: "Recover Password",
        html: `<a href="http://localhost:8080/resetpassword/${user.recover_password.id_url}">Recover Password</a>`
    })
    res.send({ result })
}

export const changeRole = async (req, res) => {
    const { uid } = req.params
    let user = await findById(uid)
    if (!user)
        res.status(404).send({ status: "error", payload: "User not found" })
    if (user.role === "admin")
        return res.status(404).send({
            status: "error",
            payload: "You can´t change an Admin user role.",
        })
    if (user.role === "user") {
        if (user.documents) {
            let identification = user.documents.find((doc) => doc.name !== "id")
            let addressVerification = user.documents.find(
                (doc) => doc.name !== "address"
            )
            let accountState = user.documents.find((doc) => doc.name !== "account")
            if (!identification || !addressVerification || !accountState)
                return res.status(404).send({
                    status: "error",
                    payload:
                        "You must upload all of the documents to become an premium user.",
                })
        } else {
            return res.status(404).send({
                status: "error",
                payload:
                    "You must upload all of the documents to become an premium user.",
            })
        }
    }
    let result = await roleChanger(uid)
    res.send({ status: "success", payload: { message: 'The role was successfully modified.', result } })
}