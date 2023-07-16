import { Router} from "express"
import {sendMessage} from '../controller/message.controller.js'

const messagesRouter = Router()

messagesRouter.get('/', authorizationRole(["user"]), sendMessage)

export default messagesRouter

