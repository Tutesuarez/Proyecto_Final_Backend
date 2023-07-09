import userManager from "../persistence/MongoDbManagers/UserManager.js"
import { createHash } from "../utils/bcrypt.js"

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
    const hashPassword = createHash(obj.password)  
    const newObj = {...obj, password: hashPassword}
    const newUser = await UserManager.createOne(newObj)
    return newUser
 } catch (error) {
    return error
 }
}

export const updateOne = async (id, obj) => { 
    try { const updatedUser = await UserManager.updateOne(id, obj) 
        return updatedUser 
    } catch (error) { 
        return error 
    } 
}

export const deleteOne = async (id) => { 
    try { 
        const deletedUser = await UserManager.deleteOne(id) 
        return deletedUser 
    } catch (error) { 
        return error 
    } 
}