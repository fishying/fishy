import mongoose from 'mongoose'
import plugins from '../util/plugin'
plugins(mongoose)

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let typeSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    alias: {
        type: String,
        unique: true
    },
    profile: {
        type: String
    },
    articlle: [{
        type: ObjectId,
        ref: 'article'
    }]
})

let type = mongoose.model('type', typeSchema)

export default type