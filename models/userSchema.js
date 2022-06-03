import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    privacyMode: {
        type: Boolean,
        default: false
    }
})

const Topic = models.Topic || model('Topic', topicSchema)

export default Topic