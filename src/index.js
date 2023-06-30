import handlebars from "express-handlebars"
import MessageManager from "./persistence/MongoDbManagers/MessageManager.js"
import express from "express"
import config from "./config/config.js"
import cors from "cors"
import { __dirname} from "./path.js"
import { Server } from "socket.io"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"

import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import './config/passport.js'

import cartRouter from "./routes/cart.routes.js"
import productsRouter from "./routes/products.routes.js"
import viewsRouter from "./routes/view.routes.js"
import routerSession from "./routes/session.routes.js"


const messageManager = new MessageManager();

const app = express()

try {
  await mongoose.connect(config.url_mongodb_atlas)
      .then('DB is Connected')
} catch (error) {
  console.log(error)
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser(config.cookie_secret)) // firma de cookie
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
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use('/api/session', routerSession)

const socketio = app.listen(config.port, () =>
  console.log(`Server running at http://localhost:${config.port}`)
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

