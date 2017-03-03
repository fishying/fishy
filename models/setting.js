import mongoose from 'mongoose'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let settingSchema = {
    title: {
        type: String,
        default: 'Fishy'
    },
    url: {
        type: String,
        default: null
    },
    profile: {
        type: String,
        default: 'hello world'
    },
    logo: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
}

let setting = mongoose.model('setting', settingSchema)

export default setting