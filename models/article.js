import mongoose from 'mongoose'
import plugins from '../util/plugin'
plugins(mongoose)

import slug from '../util/pre/slug'

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
        },
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
        type: String
    }
})

// slug
articleSchema.pre('save', async function (next) {
    this.slug = await slug(this.slug, this.title)
    next()
})

let article = mongoose.model('article', articleSchema)


export default article