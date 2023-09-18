import { Router } from 'express'
import { changeRole } from '../controller/session.controller.js'
import { findAllUsers, findOneUser, createOneUser, uploadDocuments, deleteUsers } from '../controller/user.controller.js'
import { authorizationRole, passportCall} from '../middleware/session..middleware.js'
import '../config/passport.js'
import { uploader } from '../path.js'

const routerUsers = Router()

routerUsers.get('/',findAllUsers)
routerUsers.get('/:id',findOneUser)
routerUsers.post('/',createOneUser)
routerUsers.get("/premium/:uid",passportCall('jwt'), changeRole)
routerUsers.post("/:uid/documents", uploader.any(), uploadDocuments)
routerUsers.delete("/",passportCall("jwt"), authorizationRole(["admin"]), deleteUsers)

export default routerUsers