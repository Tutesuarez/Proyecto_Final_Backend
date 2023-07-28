import { Router } from "express";
import { getLogs } from '../controller/logger.controller.js'

const logRouter = Router()

logRouter.get('/loggerTest', getLogs)

export default logRouter