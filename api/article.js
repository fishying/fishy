import { article as Article } from '../models'
import { tag as Tag } from '../models'
import md from '../server/md.js'

import pinyin from '../util/pinyin'

export let GetAll = async (limit, page, enabled = true) => {
    let count = await Article.count({enabled: enabled})
    let articleCbk = await Article.viewAll(limit, page, enabled)
    return {
        article: articleCbk.length ? articleCbk : null,
        meta: {
            pagination: {
                page: page ? page : 1,
                limit: limit ? limit : 10,
                total: Math.ceil(count / limit) ? Math.ceil(count / limit) : 1
            },
            article: {
                total: count
            }
        }
    }
}

export let GetOneId = async (id, enabled = true) => {
    let cbk = await Article.viewOneId(id, enabled)

    if (!cbk) {
        return {
            article: null,
        }
    }
    
    let prev = await Article.viewPrev(cbk._id)

    let next = await Article.viewNext(cbk._id)
    
    return {
        article:cbk,
        meta: {
            next: next,
            prev: prev
        }
    }
}

export let GetOneSlug = async (slug, enabled = true) => {
    let cbk = await Article.viewOneSlug(slug, enabled)

    if (!cbk) {
        return {
            article: null,
        }
    }

    let prev = await Article.viewPrev(cbk._id)

    let next = await Article.viewNext(cbk._id)

    return {
        article: cbk,
        meta: {
            next: next,
            prev: prev
        }
    }
}

export let Post = async (data) => {
    let tags

    if (data.tag) {
        tags = data.tag
        
        delete data.tag
    }
    let newArticle = await Article.create(data)

    if (tags) {
        for (let i in tags) {
            await Tag.findOrCreate({name: tags[i]}, {name: tags[i], slug: tags[i]})
                .then(async data => {
                    await Tag.update({_id: data._id}, {$addToSet:{article: newArticle._id}})
                    await Article.update({_id: newArticle._id}, {$addToSet:{tag: data._id}})
                })
        }
    }
    let returnArticle = await Article.findById(newArticle._id).populate({path: 'tag',select: 'name'})

    return {
        message: '添加成功',
        data: returnArticle
    }
}

export let Put = async (id, data) => {
    let infoArticle = await Article.findById(id).populate({path: 'tag',select: 'name'})
    let createTag = []
        ,tags   // 经过筛选的tag

    if (data.tag instanceof Array) {
        tags = data.tag.map(e  => {
            return String(e)
        })
    } else {
        tags = []
    }
    
    delete data.tag

    if (data.update_at) {
        data.update_at = new Date()
    }

    if (!data.slug || data.slug === '') {
        data.slug = await pinyin(data.title)
    }

    let oldTag = infoArticle.tag.map(t => {
        return t.name
    })
    
    tags.forEach(t => {
        if (oldTag.indexOf(t) < 0) {
            createTag.push({
                a: 1,
                name: t
            })
        }
    })
    
    oldTag.forEach(t => {
        if (tags.indexOf(t) < 0) {
            createTag.push({
                a: 0,
                name: t
            })
        }
    })
    
    // 修改article的tag和tag的article
    for (let i of createTag) {
        await Tag.findOrCreate({name: i.name}, {name: i.name, slug: i.name})
            .then(async data => {
                if (i.a) {
                    await Tag.update({_id: data._id}, {$addToSet:{article: id}})
                    await Article.update({_id: id}, {$addToSet:{tag: data._id}})
                } else {
                    await Tag.update({_id: data._id}, {$pull:{article: id}})
                    await Article.update({_id: id}, {$pull:{tag: data._id}})
                }
            })
    }

    let newArticle = await Article
        .findByIdAndUpdate(infoArticle._id, data, {new: true})
        .populate({path: 'tag',select: 'name'})
    return {
        message: '更改成功',
        data: newArticle
    }
}

export let Delete = async (id) => {
    let infoArticle = await Article.findByIdAndRemove(id)
    if (!infoArticle) {
        throw {message: '不存在此文章'}
    }
    if (infoArticle.tag && infoArticle.tag.length > 0) {
        for (let i of infoArticle.tag) {
            await Tag.update({_id: i}, {$pull:{article: infoArticle._id}})
        }
    }
    return {
        message: '删除成功'
    }
}

export let Verify = {
    Post: async (body) => {
        let data = body.data

        if (!data) throw '缺少必要参数参数data'

        if (!data.title || data.title == '') throw '必须添加文章标题'

        if (!data.md || data.md == '') throw '必须添加文章内容'

        /* 判断是否存在相同title和slug */
        if (await Article.findOne({title: data.title})) throw '标题已存在'
        
        if (data.slug || data.slug === '' || data.slug === null) if (await Article.findOne({slug: data.slug})) throw '路径已存在'

        return true
    },
    Put: async (body) => {
        let data = body.data
        let id = body.id

        if (!id || id == '') throw '必要参数id' 

        if (!await Article.findById(id)) throw 'id不存在'

        if (!data) throw '参数出错'

        return true
    },
    Delete: async (body) => {
        let id = body.id

        if (!id || id == '') throw '必要参数id' 

        return true
    }
}