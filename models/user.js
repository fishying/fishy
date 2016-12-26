import mongoose from 'mongoose'

let Schema = mongoose.Schema

let userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    profile: {      // 简介
        type: String,
        default: '这个人很懒，啥也没留下。。。'
    },
    avater: {
        type: String,
        default: ''
    },
    create_at: {
        type: Date,
        default: Date.now
    }
})

let user = mongoose.model('user', userSchema)


export default user