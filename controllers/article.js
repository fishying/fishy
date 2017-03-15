import { article } from '../api'
import { article as Article } from '../models'

import respond from '../util/respond'

export let GetAll = async (req, res, admin) => {
    let enabled
    let limit = parseInt(req.query.limit) || null
    let page = parseInt(req.query.page) || null

    admin === true ? enabled = false : enabled = true

    try {
        let ctx = await article.GetAll(limit, page, enabled)
        respond(res, ctx, true)
    } catch (msg) {
        console.log(msg)
        respond(res, msg)
    }
}

export let GetOne = async (req, res, admin) => {
    let enabled
    if (admin === true) {
        enabled = false
    }
    if (req.params.id) {
        article.GetOneId(req.params.id, enabled)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    } else {
        article.GetOneSlug(req.params.slug, enabled)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    }
}
export let Post = async (req, res) => {
    let data = req.body
    data.data.author ? data.data.author : data.data.author = req.user._id

    try {
        let ctx = await article.Post(data.data)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Put = async (req, res) => {
    let data = req.body
    data.data.author ? data.data.author : data.data.author = req.user._id
    try {
        let ctx = await article.Put(data.id, data.data)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Delete = async (req, res) => {
    let id = req.body.id
    try {
        let ctx = await article.Delete(id)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}
export let Verify = {
    Post: async (req, res, next) => {
        let data = req.body.data
        try {
            if (!data) throw '缺少必要参数参数data'

            if (!data.title || data.title == '') throw '必须添加文章标题'

            if (!data.md || data.md == '') throw '必须添加文章内容'

            if (await Article.findOne({title: data.title})) throw '标题已存在'
            
            if (data.slug || data.slug === '' || data.slug === null) 
                if (await Article.findOne({slug: data.slug}))
                    throw '路径已存在'
            return next()
        } catch (msg) {
            respond(res, msg)
        }

    },
    Put: async (req, res, next) => {
        let data = req.body.data
        let id = req.body.id
        try {
            if (!id || id == '') throw res, '必要参数id'

            if (!await Article.findById(id)) throw res, 'id不存在'

            if (!data) throw res, '参数出错'
            return next()
        } catch (msg) {

            respond(res, msg)
        }
    },
    Delete: async (req, res, next) => {
        let id = req.body.id
        try {
            if (!id || id == '') throw '必要参数id'
            return next()
        } catch (msg) {
            respond(res, msg)
        }

        return true
    }
}