import Article from '../models/article'
import Tag from '../models/tag'

export default {
    create: async (data) => {
        let cbk = await Tag.create(data)
        return {
            message: '添加标签成功',
            data: cbk
        }
    },
    update: async (id, data) => {
        let cbk = await Tag
            .findByIdAndUpdate(id, data, {new: true})
        return {
            message: '修改标签成功',
            data: cbk
        }
    },
    delete: async (id) => {
        let cbk = await Tag.findByIdAndRemove(id)
        if (cbk.article.length > 0) {
            for (let i of cbk.article) {
                await Article.update({_id: i}, {$addToSet:{tag: id}})
            }
        }
        return '标签删除成功'
    },
    create_verify: async (data) => {
        if (!data) throw '参数出错'

        if (!data.name || data.name == '') throw '必须添加标签名称'

        if (!await Tag.findOne({title: data.name})) throw '标签已存在'

        if (data.slug) if (await Tag.findOne({slug: data.slug})) throw '路径已存在'

        return true
    },
    update_verify: async (id, data) => {
        if (!data) throw '参数出错'
        
        if (!id || id == '') throw '必要参数id' 

        if (!await Tag.findById(id)) throw '没有此标签'

        return true
    },
    delete_verify: async (id) => {
        if (!id || id == '') throw '必要参数id' 

        if (!await Tag.findById(id)) throw '没有此标签'

        return true
    }
}