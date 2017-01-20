import Article from '../models/article'
import Tag from '../models/tag'
import pinyin from '../util/pinyin'

export default {
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

        /* 判断是否存在相同title和slug */
        if (await Article.findOne({title: data.title})) throw '标题已存在'

        if (data.slug) if (await Article.findOne({slug: data.slug})) throw '路径已存在'
        
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
        let oldArticle = await Article.findById(id).populate({path: 'tag',select: 'name'})
        if (!oldArticle) {
            throw '没有此文章'
        }
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

        let oldTag = oldArticle.tag.map(t => {
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
            .findByIdAndUpdate(oldArticle._id, updateArticle, {new: true})
            .populate({path: 'tag',select: 'name'})
        return {
            message: '更改成功',
            data: newArticle
        }
    },
    delete: async (id) => {
        try {
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
        } catch (err) {
            throw err
        }
    }
}