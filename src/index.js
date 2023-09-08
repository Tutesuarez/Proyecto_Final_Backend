import handlebars from "express-handlebars"
import MessageManager from "./persistence/MongoDbManagers/MessageManager.js"
import express from "express"
import config from "./config/config.js"
import cors from "cors"
import { __dirname} from "./path.js"
import { Server } from "socket.io"
import MongoStore from "connect-mongo"
import './config/dbConfig.js'

import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import './config/passport.js'
import initializePassport from "./config/passport.jwt.js";

import cartRouter from "./routes/cart.routes.js"
import productsRouter from "./routes/products.routes.js"
import viewsRouter from "./routes/view.routes.js"
import routerSession from "./routes/session.routes.js"
import routerFakeProducts from "./routes/mockingproducts.routes.js"
import routerUsers from "./routes/user.routes.js"

import { addLogger } from "./utils/logger.js";
import logRouter from "./routes/logger.routes.js"
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const messageManager = new MessageManager();

const app = express()
const firma_cookie=config.cookie_secret
const port = config.port


const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info:{
      title: 'FASHION CLOTHES',
      description: 'FASHION | Clothing Products | E-Commerce'
    },
    contact:{
      name:'Matias',
      email:'be.creativedesing@gmail.com'
    }
  },
  apis: [`${__dirname}/docs/*/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser(firma_cookie)) // firma de cookie
app.use(session({
  store: MongoStore.create({
    mongoUrl: config.url_mongodb_atlas,
    mongoOpcions:{useNewUrlParser:true, useUnifiedTopology:true},
    ttl:36000 // segundos
  }),
  secret: config.session_secret,
  resave: true, // me premite no perder la sesion si se cierra la ventana
  saveUninitialized: true // guarda la session aunque no contenga info
}))

//config passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use('/api/session', routerSession)
app.use('/api/users',routerUsers)
app.use('/mockingproducts', routerFakeProducts)

app.use(addLogger);
app.use("/api/logger", logRouter);



const socketio = app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
const io = new Server(socketio)
app.set("socketio", io)

io.on("connection", (socket) => {
  console.log(`New user online...`)

  socket.on("newuser", async ({ user }) => {
    socket.broadcast.emit("newuserconnected", { user: user })
    let messages = await messageManager.getMessages()
    io.emit("messageLogs", messages)
  })

  socket.on("message", async (data) => {
    await messageManager.addMessage(data)
    let messages = await messageManager.getMessages()
    io.emit("messageLogs", messages)
  })
})

