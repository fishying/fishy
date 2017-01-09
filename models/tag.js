import mongoose from 'mongoose'
import findOrCreate from '../util/plugin/findOrCreate'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId


let tagSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        default: ''
    },
    profile: {
        type: String
    },
    article: [{
        type: ObjectId,
        ref: 'article'
    }]
})

tagSchema.plugin(findOrCreate)

let tag = mongoose.model('tag', tagSchema)

export default tag