import userManager from "../persistence/MongoDbManagers/UserManager.js"

const UserManager = new userManager()

export const findOneByEmail = async(email)=>{
    try {
        const user = UserManager.findOneByEmail(email)
        return user
    } catch (error) {
        return error
    }
}

