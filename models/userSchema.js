import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    isBanned: {
        type: Array,
        default: [false, null]
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
})

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

const User = models.User || model('User', userSchema)

export default User