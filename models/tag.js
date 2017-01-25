import mongoose from 'mongoose'
import plugins from '../util/plugin'
plugins(mongoose)

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId


let tagSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        default: ''
    },
    profile: {
        type: String
    },
    article: [{
        type: ObjectId,
        ref: 'article'
    }],
    image: {
        type: String,
        default: null
    }
})

// update后假如没有article在此tag，将删除此tag
/* tagSchema.post('update', async function () {
    let tags = await this.findOne({})
    if (tags.article.length === 0) {
        await this.remove({'_id': tags._id})
    }
})*/
let tag = mongoose.model('tag', tagSchema)


export default tag