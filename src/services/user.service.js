import UserDTO from "../DTO/user.dto.js"
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
    const newObjDTO = new UserDTO(newObj)
    const newUser = await UserManager.createOne(newObjDTO)
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

export const deleteInactiveUser = async(uid)=>{
    try {
        const delInactiveUsers = await deleteInactiveUser(uid)
        return delInactiveUsers
    } catch (error) {
        return error
    }
}

export const setLastConnection = async (uid) => { 
    try { 
        const setConnection = await UserManager.setLastConnection(uid) 
        return setConnection 
    } catch (error) { 
        return error 
    } 
}

export const uploadDocument= async (uid, documents) => { 
    try { 
        const upLoadDoc = await UserManager.uploadDocuments(uid, documents) 
        return upLoadDoc 
    } catch (error) { 
        return error 
    } 
}