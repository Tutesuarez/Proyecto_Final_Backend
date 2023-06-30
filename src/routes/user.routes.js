import { findAllUsers, findOneUser, createOneUser } from '../controller/user.controller.js'

const routerUsers = Routes()

routerUsers.get('/',findAllUsers)
routerUsers.get('/:id',findOneUser)
routerUsers.post('/',createOneUser)

export default routerUsers