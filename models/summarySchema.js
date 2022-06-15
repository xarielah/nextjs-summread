import { Schema, model, models } from "mongoose";

// TODO: Remove defaults on Schema


const summarySchema = new Schema({
    title: {
        type: String,
        default: () => {
            const names = [
                'The behaviourism of a rabbit',
                'Self-bias in local cities of McDonalds',
                'Jam stones are hitting hard rock',
                'King Julian was the worst dictator',
                'Tony the Terrorist keeps on attacking cities',
                'The house of Klush is able to heal people',
                'Gezer is my best friend in whole world',
                'Some more fake titles hahaha',
                '2 Sukar bli halav, Shahor'
            ]

            let n = names.length
            let rand = Math.floor(Math.random() * n)
            return names[rand]
        },
        required: true
    },
    authorID: {
        type: String,
        default: '62965acf3b92a9ed1544f8a5',
        required: true
    },
    authorName: {
        type: String,
        default: () => {
            const names = [
                'Ponpon Ben Hamo',
                'Edna Aharon',
                'Rabbit Jumpsman',
                'Pookle Ben Hamo',
                'Tony the Terrorist',
                'Doozle Shnoozle',
                'Wicked Shnitzel',
                'Gizgiz',
                'Kyloolie'
            ]

            let n = names.length
            let rand = Math.floor(Math.random() * n)
            return names[rand]
        },
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
        default: () => {
            return Math.floor(Math.random() * 10)
        },
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    }
})

const Summary = models.Summary || model('Summary', summarySchema)

export default Summary