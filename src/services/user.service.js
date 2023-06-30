import userManager from "../persistence/MongoDbManagers/UserManager"
import { createHash } from "../utils/bcrypt"

const UserManager = new userManager()

export const findall= async()=>{
    try {
        const user = UserManager.findall()
        return user
    } catch (error) {
        return error
    }
}

export const findById = async(id)=>{
    try {
        const user = UserManager.findOneById(id)
        return user
    } catch (error) {
        return error
    }
}

export const createOne = async(obj)=>{
 try {
    const hashPassword = await createHash(obj.password)  
    const newObj = {...obj, password: hashPassword}
    const newUser = await UserManager.createOne(newObj)
    return newUser
 } catch (error) {
    return error
 }
}

// Crear metodo para Actualizar un usuario

// Crear metodo para Eliminar un usuario