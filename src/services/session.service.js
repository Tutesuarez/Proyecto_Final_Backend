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

export const changePassword = async({email, newpassword}) => await UserManager.updatePassword({email, newpassword })
export const recoverPass = async(user) => await UserManager.recoverPassword(user)
export const roleChanger = async (uid) => await UserManager.changeRole(uid)
export const urlCheckReset = async (idurl) => await  UserManager.checkResetUrl(idurl)
export const resetRecoverPass = async (email) => await UserManager.resetRecoverPassword(email)