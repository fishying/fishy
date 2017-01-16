import mongoose from 'mongoose'
import plugins from '../util/plugin'
plugins(mongoose)

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

tagSchema.pre('update', async function (next) {
    console.log(this)
    next()
})

let tag = mongoose.model('tag', tagSchema)


export default tag