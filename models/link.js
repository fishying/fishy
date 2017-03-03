import mongoose from 'mongoose'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let linkSchema = {
    name: {
        type: String
    },
    url: {
        type: String
    },
    profile: {
        type: String
    },
    image: {
        type: String,
        default: null
    }
}

let link = mongoose.model('link', linkSchema)

export default link