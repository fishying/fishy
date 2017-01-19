import article from '../models/article'
import tag from '../models/tag'
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
        if (await article.findOne({title: data.title})) throw '标题已存在'

        if (data.slug) if (await article.findOne({slug: data.slug})) throw '路径已存在'
        try {
            let newArticle = await article.create(data)

            if (tags) {
                for (let i in tags) {
                    await tag.findOrCreate({name: tags[i]}, {name: tags[i], slug: tags[i]})
                        .then(async data => {
                            await tag.update({_id: data._id}, {$addToSet:{article: newArticle._id}})
                            await article.update({_id: newArticle._id}, {$addToSet:{tag: data._id}})
                        })
                }
            }
            let returnArticle = await article.findById(newArticle._id).populate({path: 'tag',select: 'name'})

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
        let oldArticle = await article.findById(id).populate({path: 'tag',select: 'name'})
        let createTag = []   // 经过筛选的tag
        let tags = updateArticle.tag
        
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
        for (let i in createTag) {
            await tag.findOrCreate({name: createTag[i].name}, {name: createTag[i].name, slug: createTag[i].name})
                .then(async data => {
                    if (createTag[i].a) {
                        await tag.update({_id: data._id}, {$addToSet:{article: id}})
                        await article.update({_id: id}, {$addToSet:{tag: data._id}})
                    } else {
                        await tag.update({_id: data._id}, {$pull:{article: id}})
                        await article.update({_id: id}, {$pull:{tag: data._id}})
                    }
                })
        }

        let newArticle = await article
            .findByIdAndUpdate(oldArticle._id, updateArticle, {new: true})
            .populate({path: 'tag',select: 'name'})
        return {
            message: '更改成功',
            data: newArticle
        }
    },
    delete: async (id) => {
        try {
            let infoArticle = await article.findByIdAndRemove(id)
            if (!infoArticle) {
                throw {message: '不存在此文章'}
            }
            if (infoArticle.tag && infoArticle.tag.length > 0) {
                for (let i of infoArticle.tag) {
                    await tag.update({_id: i}, {$pull:{article: infoArticle._id}})
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