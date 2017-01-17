import mongoose from 'mongoose'
import plugins from '../util/plugin'
plugins(mongoose)

import pinyin from '../util/pinyin'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let articleSchema = new Schema ({
    title: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return v && v != '' ? true : false
            },
            message: '{VALUE} 不是正确的标题'
        }
    },
    md: {
        type: String,
        unique: true
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