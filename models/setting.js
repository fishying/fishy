import mongoose from 'mongoose'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let settingSchema = {
    title: {
        type: String,
        default: 'test'
    },
    profile: {
        type: String,
        default: 'test'
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