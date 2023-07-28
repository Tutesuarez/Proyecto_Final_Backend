import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    url_mongodb_atlas: process.env.URL_MONGODB_ATLAS,
    cookie_secret: process.env.COOKIE_SECRT,
    session_secret: process.env.SESSION_SECRET,
    salt: process.env.SALT,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    secret_jwt: process.env.SECRET_JWT,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret :process.env.GOOGLE_CLIENT_SECRET,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    loggerType: process.env.LOGGER
    
}