import { article } from '../api'
import { Article } from '../models'
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
        let ctx = await article.Put(data.data)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Delete = async (req, res) => {
    let id = req.body.id
    try {
        let ctx = await article.delete(id)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}
export let Verify = {
    Post: async (req, res, next) => {
        let data = req.body.data

        if (!data) respond(res, '缺少必要参数参数data')

        if (!data.title || data.title == '') respond(res, '必须添加文章标题')

        if (!data.md || data.md == '') respond(res, '必须添加文章内容')

        if (await Article.findOne({title: data.title})) respond(res, '标题已存在')
        
        if (data.slug || data.slug === '' || data.slug === null) 
            if (await Article.findOne({slug: data.slug}))
                respond(res, '路径已存在')

        return next()
    },
    Put: async (req, res, next) => {
        let data = req.body.data
        let id = req.body.id

        if (!id || id == '') respond(res, '必要参数id')

        if (!await Article.findById(id)) respond(res, 'id不存在')

        if (!data) respond(res, '参数出错')

        return next()
    },
    Delete: async (req, res, next) => {
        let id = req.body.id

        if (!id || id == '') respond(res, '必要参数id')

        return true
    }
}