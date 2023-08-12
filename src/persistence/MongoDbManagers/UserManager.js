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

    async findOneByEmail(email) {
        try {
            const user = await userModel.findOne({ email })
            return user
        } catch (error) {
            return error
        }
    }

    async updatePassword({ email, newpassword }) {
        try {
            let user = await this.get(email);
            if (user?.error) throw new Error(user.error);
            let result = await userModel.updateOne(
                { email },
                {
                    $set: {
                        password: newpassword, recover_password:
                        {
                            id_url: null,
                            createTime: null
                        }
                    }
                }
            );
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async recoverPassword(user) {
        try {
            let result = await userModel.updateOne(
                { email: user.email },
                { $set: { recover_password: user.recover_password } }
            );
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async resetRecoverPassword(email) {
        try {
            let result = await userModel.updateOne(
                { email },
                {
                    $set: {
                        recover_password:
                        {
                            id_url: null,
                            createTime: null
                        }
                    }
                }
            );
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async checkResetUrl(idurl) {
        try {
            let result = await userModel.findOne({ "recover_password.id_url": idurl }).lean();
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async changeRole(uid) {
        try {
            let user = await userModel.findOne({ _id: uid }, { __v: 0 }).lean();
            if (!user) throw new Error(`User not exists.`);
            let newRole = (user.role === "user") ? "premium" : "user";
            let result = await userModel.updateOne(
                { _id: uid },
                { $set: { role: newRole } }
            );
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }
}