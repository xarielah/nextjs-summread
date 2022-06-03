import { Schema, model, models } from "mongoose";

const topicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        default: -1,
        require: true,
        unique: true
    }
})

const Topic = models.Topic || model('Topic', topicSchema)

export default Topic