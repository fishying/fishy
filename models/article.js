import mongoose from 'mongoose'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let articleSchema = new Schema ({
    title: {
        type: String,
        unique: true
    },
    author: {
        type: ObjectId,
        ref: 'user'
    },
    vistits: {
        type: Number,
        default: 0
    },
    type:{
        type: ObjectId,
        ref: 'type'
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
    enabled: Boolean,
    content: String
})

let article = mongoose.model('article', articleSchema)

export default article