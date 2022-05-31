import { Schema, model, models } from "mongoose";

const summarySchema = new Schema({
    title: {
        type: String,
        default: 'This is a default title'
    },
    authorID: {
        type: String,
        default: 'Ariel'
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    description: {
        type: String,
        default: 'This is a default description\n You should check me out!'
    },
    topicID: {
        type: String,
        default: -1
    },
    isLocked: {
        type: Boolean,
        default: false
    }
})

const Summary = models.Summary || model('Summary', summarySchema)

export default Summary