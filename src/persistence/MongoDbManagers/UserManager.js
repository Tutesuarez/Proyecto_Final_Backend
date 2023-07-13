import { userModel } from "../models/user.model.js"
import UserDTO from "../../DTO/user.dto.js"

export default class userManager {
    async findall() {
        try {
            const user = await userModel.find()
            return user
        } catch (error) {
            return error
        }
    }

    async findOneById(id) {
        try {
            const user = await userModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        try {
            const userDTO = new UserDTO(obj)
            const newUser = await userModel.createOne(userDTO)
            return newUser
        } catch (error) {
            return error
        }
    }

    async updateOne(id, obj) {
        try {
            const updateUser = await userModel.updateOne({ _id: id }, { $set: obj })
            return updateUser
        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const deleteUser = await userModel.deleteOne({ _id: id })
            return deleteUser
        } catch (error) {
            return error
        }
    }

    async findOneByEmail(email){
        try{
            const user = await userModel.findOne({email})
            return user
        }catch(error){
            return error
        }
    }


}