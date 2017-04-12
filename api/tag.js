import Article from '../models/article'
import { tag as Tag } from '../models'
import md from '../server/md.js'
import omit from '../lib/util/omit.js'

const defaultTag = ['name', 'cover', 'slug', 'description']

export let GetAll = async (limit, page) => {
    limit = limit ? limit : 10
    page = page ? page : 1

    let cbk = await Tag.viewAll(limit, page)
    let total = await Tag.count()
    console.info('GetAll Tag ok')
    return {
        tag: cbk.length ? cbk : null,
        meta: {
            pagination: {
                page: page,
                limit: limit,
                total: Math.ceil(total / limit)
            },
            tag: {
                total: total
            }
        }
    }
}

export let GetOneId = async (id, limit, page) => {
    limit = limit ? limit : 10
    page = page ? page : 1

    let cbk = await Tag.viewOneId(id, limit, page)
    let articleTotal = await Tag.viewArticleCount(cbk._id)
    console.info(`GetOne ${id} Tag ok`)
    return {
        tag: cbk ? cbk : null,
        meta: {
            pagination: {
                page: page,
                limit: limit,
                total: Math.ceil(articleTotal / limit)
            },
            article: {
                total: articleTotal
            }
        }
    }
}

export let GetOneSlug = async (slug, limit, page) => {
    limit = limit ? limit : 10
    page = page ? page : 1

    let cbk = await Tag.viewOneSlug(slug, limit, page)
    let articleTotal = await Tag.viewArticleCount(cbk._id)
    console.info(`GetOne ${cbk._id} Tag ok`)
    return {
        tag: cbk ? cbk : null,
        meta: {
            pagination: {
                page: page,
                limit: limit,
                total: Math.ceil(articleTotal / limit)
            },
            article: {
                total: articleTotal
            }
        }
    }
}

export let Post = async (data) => {
    let cbk = await Tag.create(data)

    if (!data.article || data.article.length > 0) {
        for (let a of data.article){
            await Article.update({_id: a}, {$addToSet:{tag: cbk._id}})
        }
    }
    return {
        message: '添加标签成功',
        data: cbk
    }
}

export let Put = async (id, data) => {
    data = omit(defaultTag, data)
    let cbk = await Tag
        .findByIdAndUpdate(id, data, {new: true})
    console.info(`Put ${id} Tag ok`)
    return {
        message: '修改标签成功',
        data: cbk
    }
}

export let Delete = async (id) => {
    let cbk = await Tag.findByIdAndRemove(id)
    if (cbk.article.length > 0) {
        for (let i of cbk.article) {
            await Article.update({_id: i}, {$addToSet:{tag: id}})
        }
    }
    console.info(`Put ${id} Tag ok`)
    return {
        message: '修改标签成功'
    }
}