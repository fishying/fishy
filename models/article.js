import mongoose from 'mongoose'
import plugins from '../util/plugin'

import md from '../server/md.js'
plugins(mongoose)

import pinyin from '../util/pinyin'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let articleSchema = new Schema ({
    title: {
        type: String,
        unique: true
    },
    md: {
        type: String
    },
    slug: {
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
    enabled: {
        type:Boolean,
        default: false
    },
    image: {
        type: String,
        default: null
    }
},{
    toJSON: {virtuals: true}
})


// slug
articleSchema.pre('save', async function (next) {
    if (!this.slug || this.slug === '') {
        this.slug = await pinyin(this.title)
    }
    next()
})

let article = mongoose.model('article', articleSchema)


export default article