import mongoose from './mongoose'
import md from '../server/md.js'

import pinyin from '../lib/util/pinyin'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let articleSchema = new Schema ({
    title: {
        type: String,
        unique: true
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
    cover: {
        type: String,
        default: null
    },
    ismd: {
        type: Boolean,
        default: true
    },
    page: {
        type: Boolean,
        default: false
    }
}, {
    toJson: {
        virtuals: true
    }
})

let select = 'create_at vistits cover _id md slug title tag enabled author create_at update_at ismd page'

// slug
articleSchema.pre('save', async function (next) {
    if (!this.slug || this.slug === '') {
        this.slug = await pinyin(this.title)
    }
    next()
})

let article = mongoose.model('article', articleSchema)

article.viewAll = async (limit, page, enabled) => {
    let cbk = await article
        .find()
        .select(select)
        .where(enabled ? {enabled: enabled} : {})
        .lean()
        .skip(limit*(page - 1))
        .limit(limit)
        .populate({path: 'tag',select: 'name slug'})
        .populate({path: 'author', select: 'name slug avatar'})
        .sort({'_id': -1})
    return cbk.map(e => {
        e.content =  e.ismd ? md.render(e.md) : e.md
        return e
    })
}

article.viewOneId = async (id, enabled) => {
    let articleCbk = await article
        .findByIdAndUpdate(id, {$inc:{'vistits':1}})
        .select(select)
        .where(enabled ? { enabled: enabled } : {})
        .populate({path: 'tag',select: 'name slug'})
        .populate({path: 'author',select: 'name slug avatar'})
        .lean()
    if (articleCbk) {
        if (articleCbk.ismd) {
            articleCbk.content = md.render(articleCbk.md)
        } else {
            articleCbk.content = articleCbk.md
        }
    }

    return articleCbk
}

article.viewOneSlug = async (slug, enabled) => {
    let articleCbk = await article
        .findOneAndUpdate({slug: slug}, {$inc:{'vistits':1}})
        .select(select)
        .where(enabled ? {enabled: enabled} : {})
        .populate({path: 'tag',select: 'name slug'})
        .populate({path: 'author',select: 'name slug avatar'})
        .lean()
    
    if (articleCbk) {
        if (articleCbk.ismd) {
            articleCbk.content = md.render(articleCbk.md)
        } else {
            articleCbk.content = articleCbk.md
        }
    }

    return articleCbk
}

article.viewPrev = async (id) => {
    let articleCbk = await article
        .findOne({_id: {$lt: id}})
        .select(select)
        .limit(1)
        .populate({path: 'tag',select: 'name slug'})
        .populate({path: 'author',select: 'name slug'})
        .lean()
    
    if (articleCbk) {
        if (articleCbk.ismd) {
            articleCbk.content = md.render(articleCbk.md)
        } else {
            articleCbk.content = articleCbk.md
        }
    }

    return articleCbk
}

article.viewNext = async (id) => {
    let articleCbk = await article
        .findOne({_id: {$gt: id}})
        .select(select)
        .limit(1)
        .populate({path: 'tag',select: 'name slug'})
        .populate({path: 'author',select: 'name slug'})
        .lean()
    
    if (articleCbk) {
        if (articleCbk.ismd) {
            articleCbk.content = md.render(articleCbk.md)
        } else {
            articleCbk.content = articleCbk.md
        }
    }

    return articleCbk
}

export default article