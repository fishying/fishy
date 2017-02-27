import mongoose from 'mongoose'
import plugins from '../util/plugin'

import md from '../server/md.js'

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
        type: String,
        default: ''
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

tag.viewAll = async (limit, page) => {
    let cbk = await tag
        .find()
        .skip(limit*(page - 1))
        .limit(limit)
        .populate({path: 'article'})
        .sort({'create_at': -1})
        .lean()

    if (cbk) {
        cbk = cbk.map(e => {
            for (let i in e.article) {
                e.article[i].content = md.render(e.article[i].md)
            }
            return e
        })
    }

    return cbk
}

tag.viewOneId = async (id) => {
    let cbk = await tag
        .findById(id)
        .populate({path: 'article'})
        .lean()
    if (cbk) {
        for (let i in cbk.article) {
            cbk[i].content = md.render(cbk.article[i].md)
        }
    }
    return cbk
}

tag.viewOneSlug = async (slug) => {
    let cbk = await tag
        .findOne({slug: slug})
        .populate({path: 'article'})
        .lean()
    if (cbk) {
        for (let i in cbk.article) {
            cbk[i].content = md.render(cbk.article[i].md)
        }
    }
    return cbk
}

export default tag