import { article } from '../models'
import { tag } from '../models'

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
        
        if (tags instanceof Array) {
            await tags.map(async (i) => {
                tag.findOrCreate({name: i}, {name: i, slug: i})
                    .then(async data => {
                        await tag.update({_id: data._id}, {$addToSet:{article: newArticle._id}})
                        await article.update({_id: newArticle._id}, {$addToSet:{tag: data._id}})
                    })
            })
            return {
                msg: '添加成功',
                data: newArticle
            }
        }
    }
}