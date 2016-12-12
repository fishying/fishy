import mongoose from 'mongoose'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let tagSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    alias: {
        type: String,
        unique: true
    },
    profile: {
        type: String
    },
    articlle: [{
        type: ObjectId,
        ref: 'article'
    }]
})

let tag = mongoose.model('tag', tagSchema)

export default tag