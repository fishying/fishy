import Article from '../models/article'
import Tag from '../models/tag'

import pinyin from '../util/pinyin'

export default {
    allView: async (limit = 10, page = 1) => {
        let count = await Article.count()
        
        let cbk = await Article
            .find()
            .skip(limit*(page - 1))
            .limit(limit)
            .populate({path: 'tag',select: 'name slug'})
            .populate({path: 'author',select: 'name slug'})
            .sort({'create_at': -1})
        return {
            article: cbk,
            meta: {
                pagination: {
                    page: page,
                    limit: limit,
                    total: Math.ceil(count / limit)
                },
                article: {
                    total: count
                }
            }
        }
    },
    oneViewId: async (id) => {
        console.log(id)
        let cbk = await Article
            .findById(id)
            .populate({path: 'tag',select: 'name slug'})
            .populate({path: 'author',select: 'name slug'})

        let prev = await Article
            .findOne({_id: {$lt: id}})
            .limit(1)
            .populate({path: 'tag',select: 'name slug'})
            .populate({path: 'author',select: 'name slug'})
            
        let next = await Article
            .findOne({_id: {$gt: id}})
            .limit(1)
            .populate({path: 'tag',select: 'name slug'})
            .populate({path: 'author',select: 'name slug'})
        return {
            article:cbk,
            meta: {
                next: next,
                prev: prev
            }
        }
    },
    oneViewSlug: async (slug) => {
        let cbk = await Article
            .findOne({slug: slug})
            .populate({path: 'tag',select: 'name slug'})
            .populate({path: 'author',select: 'name slug'})

        let prev = await Article
            .findOne({_id: {$lt: cbk._id}})
            .limit(1)
            .populate({path: 'tag',select: 'name slug'})
            .populate({path: 'author',select: 'name slug'})

        let next = await Article
            .findOne({_id: {$gt: cbk._id}})
            .limit(1)
            .populate({path: 'tag',select: 'name slug'})
            .populate({path: 'author',select: 'name slug'})

        return {
            article:cbk,
            meta: {
                next: next,
                prev: prev
            }
        }
    },
    /**
     * create
     * 添加article
     * 
     * @param {Object} data
     * @param {Array} tags
     * @returns Promise
     */
    create: async (data) => {
        let tags

        if (data.tag) {
            tags = data.tag
            
            delete data.tag
        }

        
        try {
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
        } catch (err) {
            throw err
        }
    },
    /**
     * update
     * 更新article
     * 
     * @param {String} id
     * @param {Object} data
     * @param {Array} tags
     * @returns Promise
     */
    update: async (id, updateArticle) => {
        let infoArticle = await Article.findById(id).populate({path: 'tag',select: 'name'})
        
        let createTag = []   // 经过筛选的tag
        let tags = updateArticle.tag.map(e  => {
            return String(e)
        })
        
        delete updateArticle.tag

        if (updateArticle.update_at) {
            updateArticle.update_at = new Date()
        }

        if (!updateArticle.slug || updateArticle.slug === '') {
            updateArticle.slug = await pinyin(updateArticle.title)
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
            .findByIdAndUpdate(infoArticle._id, updateArticle, {new: true})
            .populate({path: 'tag',select: 'name'})
        return {
            message: '更改成功',
            data: newArticle
        }
    },
    /**
     * delete
     * 删除article
     * 
     * @param {Object} body
     * @returns Promise
     */
    delete: async (id) => {
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
    },
    /**
     * create_verify
     * article.create的验证
     * 
     * @param {Object} body
     * @returns Promise
     */
    create_verify: async (body) => {
        let data = body.data
        if (!data) throw '参数出错'

        if (!data.title || data.title == '') throw '必须添加文章标题'

        if (!data.md || data.md == '') throw '必须添加文章内容'

        /* 判断是否存在相同title和slug */
        if (await Article.findOne({title: data.title})) throw '标题已存在'

        if (data.slug) if (!await Article.findOne({slug: data.slug})) throw '路径已存在'

        return true
    },
    /**
     * update_verify
     * article.update的验证
     * 
     * @param {Object} body
     * @returns Promise
     */
    update_verify: async (body) => {
        let data = body.data
        let id = body.id

        if (!id || id == '') throw '必要参数id' 

        if (!await Article.findById(id)) throw '标题已存在'

        if (!data) throw '参数出错'

        return true
    },
    /**
     * delete_verify
     * article.delete的验证
     * 
     * @param {Object} body
     * @returns Promise
     */
    delete_verify: async (body) => {
        let id = body.id

        if (!id || id == '') throw '必要参数id' 

        return true
    }
}