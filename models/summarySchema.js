import { Schema, model, models } from "mongoose";

const summarySchema = new Schema({
    title: {
        type: String,
        default: 'This is a default title',
        required: true
    },
    authorID: {
        type: String,
        default: 'Ariel',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    description: {
        type: String,
        default: 'This is a default description\n You should check me out!',
        required: true
    },
    topicID: {
        type: String,
        default: -1,
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false,
        required: true
    }
})

const Summary = models.Summary || model('Summary', summarySchema)

export default Summary