import { Schema, model } from "mongoose"

const userCollection = 'user'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
    },
    role: {
        type: String,
        default: "user"
    },
    recover_password: {
        id_url: { 
            type: String 
        },
        createTime: { 
            type: String 
        }
    },
    documents: {
        type: [
            {
                name: { 
                    type: String 
                },
                reference: { 
                    type: String 
                }
            }
        ]
    },
    last_connection: { 
        type: String 
    }
});

userSchema.pre('findOne', function () {
    this.populate('cart')
})

export const userModel = model(userCollection, userSchema)