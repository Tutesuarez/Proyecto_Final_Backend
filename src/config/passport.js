import local from 'passport-local'  // importo estrategia a utilizar
import passport from 'passport' // importo el core del passport
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import { userModel } from '../persistence/models/user.model.js'
import config from './config.js'
import { ExtractJwt,
         Strategy as jwtStrategy
        } from 'passport-jwt'

const LocalStrategy = local.Strategy // defino estragia local

// passport GOOGLE
const g_client_id = config.google_client_id
const g_client_secret = config.google_client_secret

//Passport Github
const g_hub_id = config.clientID
const g_hub_secret = config.clientSecret


// Defino la aplicacion de mi estragia
passport.use('register', new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: 'email'
    },
    async (req, usernameField, password, done) => {
        const { first_name, last_name, email, gender } = req.body
        try {
            const user = await userModel.findone({ email: email }) // busco un usuario con el mail ingresado

            if (user) {
                return (null, false) // Usuario ya registrado
            }

            // si usuario no exite, lo creo
            const passwordHash = createHash(password)
            const userCreated = userModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                password: passwordHash
            })
            return done(null, userCreated)
        } catch (error) {
            return done(error)
        }
    }
))

// inicializar la session del usuario
passport.serializeUser((user, done) => {
    done(null, user._id)
})

//Eliminar la sesion del usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = userModel.findById(id)
        done(null, user)
    } catch {
        done(error)
    }
})


async function verifyCallback(accessToken, refreshToken, profile, done) {
    const { name, email, gender } = profile._json
    try {
        const userDB = await userModel.findOne({ email })
        if (userDB) {
            return done(null, userDB)
        }
        const user = {
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1] || '',
            email,
            gender: gender || '',
            password: ' ',
        }
        const newUserDB = await userModel.create(user)
        done(null, newUserDB)
    } catch (error) {
        done(error)
    }
}

// GITHUB STRATEGY
passport.use('githubSignup', new GithubStrategy({
    clientID: g_hub_id,
    clientSecret: g_hub_secret,
    callbackURL: 'http://localhost:8080/api/session/githubSignup',
}, verifyCallback))

// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: g_client_id,
    clientSecret: g_client_secret,
    callbackURL: "http://localhost:8080/api/session/google"
},
    async function (accessToken, refreshToken, profile, done) {
        const { given_name, family_name, email } = profile._json
        try {
            const userDB = await userModel.findOne({ email })
            if (userDB) {
                return done(null, userDB)
            }
            const user = {
                first_name: given_name,
                last_name: family_name || '',
                email,
                gender: gender || '',
                password: ' ',
            }
            const newUserDB = await userModel.create(user)
            done(null, newUserDB)
        } catch (error) {
            done(error)
        }
    }
));

// JWT- STRaTEGY
// passport.use('jwtStrategy', new jwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrkey: config.secret_jwt
// }, async(jwt_payload, done)=>{
//     done(null,jwt_payload.user)
// }))