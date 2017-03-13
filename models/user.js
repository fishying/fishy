import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import pinyin from '../util/pinyin'
import plugins from '../util/plugin'
plugins(mongoose)


let Schema = mongoose.Schema

let userSchema = new Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    description: {      // 简介
        type: String,
        default: '这个人很懒，啥也没留下。。。'
    },
    avatar: {
        type: String,
        default: null
    },
    cover: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: String,
        default: Date.now
    },
    website: {
        type: Date,
        default: null
    },
    location: {
        type: String,
        default: null
    }
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'name',
    limitAttempts: true
})

userSchema.pre('save', async function (next) {
    if (!this.slug || this.slug === '') {
        this.slug = await pinyin(this.name)
    }
    next()
})

let user = mongoose.model('user', userSchema)


export default user