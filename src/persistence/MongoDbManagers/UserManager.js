import { userModel } from "../models/user.model"


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
            const newUser = await userModel.createOne(obj)
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


}