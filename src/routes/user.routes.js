import { Router } from 'express'
import { changeRole } from '../controller/session.controller.js'
import { findAllUsers, findOneUser, createOneUser, uploadDocuments, deleteUsers, deleteUser } from '../controller/user.controller.js'
import { authorizationRole, passportCall} from '../middleware/session..middleware.js'
import '../config/passport.js'
import { uploader } from '../path.js'

const routerUsers = Router()

routerUsers.get('/',findAllUsers)
routerUsers.get('/:id',findOneUser)
routerUsers.post('/',createOneUser)
routerUsers.get("/premium/:uid",passportCall('jwt'),authorizationRole(["admin"]), changeRole)
routerUsers.post("/:uid/documents", uploader.any(), uploadDocuments)
routerUsers.delete("/",passportCall("jwt"), authorizationRole(["admin"]), deleteUsers)
routerUsers.delete("/user/:uid",passportCall("jwt"), authorizationRole(["admin"]), deleteUser)

export default routerUsers