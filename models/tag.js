import mongoose from './mongoose'

import md from '../server/md.js'

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
    description: {
        type: String,
        default: ''
    },
    article: [{
        type: ObjectId,
        ref: 'article'
    }],
    cover: {
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
        .sort({'_id': -1})
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

tag.viewOneId = async (id, limit, page) => {
    let cbk = await tag
        .findById(id)
        .deepPopulate('article article.author article.tag', {
            populate: {
                article: {
                    options: {
                        limit: limit,
                        skip: limit*(page - 1),
                        sort: {'create_at': 1}
                    }
                }
            }
        })
        .lean()
    if (cbk) {
        for (let i of cbk.article) {
            i.content = md.render(i.md)
        }
    }
    return cbk
}

tag.viewOneSlug = async (slug, limit, page) => {
    let cbk = await tag
        .findOne({slug: slug})
        .deepPopulate('article article.author article.tag', {
            populate: {
                article: {
                    options: {
                        limit: limit,
                        skip: limit*(page - 1),
                        sort: {'_id': 1}
                    }
                }
            }
        })
        .lean()
    if (cbk) {
        for (let i of cbk.article) {
            i.content = md.render(i.md)
        }
    }
    return cbk
}

tag.viewArticleCount = async (id) => {
    let cbk = await tag.findById(id)
    return cbk.article.length
}

export default tag