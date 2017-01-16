import article from '../models/article'
import tag from '../models/tag'

export default {
    /**
     * create
     * 添加article
     * 
     * @param {Object} data
     * @param {Array} tags
     * @returns Promise
     */
    create: async (data, tags) => {
        /* 判断是否存在相同title和slug */
        if (await article.findOne({title: data.title})) throw '标题已存在'

        if (data.slug) if (await article.findOne({slug: data.slug})) throw '路径已存在'

        let newArticle = await article.create(data)
        
        await tags.map(async (i) => {
            tag.findOrCreate({name: i}, {name: i, slug: i})
                .then(async data => {
                    await tag.update({_id: data._id}, {$addToSet:{article: newArticle._id}})
                    await article.update({_id: newArticle._id}, {$addToSet:{tag: data._id}})
                })
        })
        return {
            message: '添加成功',
            article: newArticle
        }
    },
    update: async (id, data, tags) => {
        let oldArticle = await article.findById(id).populate({path: 'tag',select: 'name'})
        let createTag = []   // 经过筛选的tag
        
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

        await createTag.map(async (i) => {
            tag.findOrCreate({name: i.name}, {name: i.name, slug: i.name})
                .then(async data => {
                    if (i.a) {
                        await tag.update({_id: data._id}, {$addToSet:{article: id}})
                        await article.update({_id: id}, {$addToSet:{tag: data._id}})
                    }
                })
        })
    }
}