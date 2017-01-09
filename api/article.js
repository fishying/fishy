import { article } from '../models'
import { tag } from '../models'

export default {
    create: async (data, tags) => {
        let newArticle
        try {
            newArticle = await article.create(data)
        } catch (err) {
            return Promise.reject('失败')
        }
        console.log(newArticle)
        if (tags instanceof Array) {
            tags.map(async (i) => {
                tag.findOrCreate({name: i}, {name: i, slug: i})
                    .then(async data => {
                        await tag.update({_id: data._id}, {$addToSet:{article: newArticle._id}})
                        await article.update({_id: newArticle._id}, {$addToSet:{tag: data._id}})
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            article
        }
    }
}