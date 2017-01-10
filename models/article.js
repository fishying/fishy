import mongoose from 'mongoose'
import findOrCreate from '../util/plugin/findOrCreate'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let articleSchema = new Schema ({
    title: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        default: ''
    },
    author: {
        type: ObjectId,
        ref: 'user'
    },
    vistits: {
        type: Number,
        default: 0
    },
    tag: [{
        type: ObjectId,
        ref: 'tag'
    }],
    create_at: {
        type : Date,
        default: Date.now
    },
    update_at: {
        type : Date,
        default: Date.now
    },
    cover: {
        type:String,
        default: ''
    },
    full: {
        type:Boolean,
        default: false
    },
    enabled: {
        type:Boolean
    },
    content: {
        type: String
    }
})

articleSchema.plugin(findOrCreate)

articleSchema.pre('save', async function (next) {
    this.slug = 'afasdfsdf'
    next()
})

let article = mongoose.model('article', articleSchema)


export default article