import { tag } from '../api'
import { tag as Tag } from '../models'
import respond from '../lib/util/respond'

export let GetAll = async (req, res) => {
    let limit = parseInt(req.query.limit) || null
    let page = parseInt(req.query.page) || null
    try {
        let ctx = await tag.GetAll(limit, page)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let GetOne = async (req, res) => {
    try {
        let ctx
        if (req.params.id) {
            ctx = await tag.GetOneId(req.params.id)
        } else {
            ctx = await tag.GetOneSlug(req.params.slug)
        }
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Post = async (req, res) => {
    try {
        let ctx = await tag.Post(req.body.data)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Put = async (req, res) => {
    try {
        let ctx = await tag.Put(req.body.id, req.body.data)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Delete = async (req, res) => {
    try {
        let ctx = await tag.Delete(req.body.id)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Verify = {
    Post: async (req, res, next) => {
        let data = req.body
        try {
            if (!data) throw '参数出错'

            if (!data.name || data.name == '') throw '必须添加标签名称'

            if (await Tag.findOne({name: data.name})) throw '标签已存在'

            if (data.slug) if (await Tag.findOne({slug: data.slug})) throw '路径已存在'
            return next()
        } catch (msg) {
            respond(res, {message: msg,
                data: req.body.data
            })
        }
    },
    Put: async (req, res, next) => {
        let data = req.body.data
        let id = req.body.id
        try {
            
            if (!data) throw '参数出错'
            
            if (!id || id == '') throw '必要参数id' 

            if (!await Tag.findById(id)) throw '没有此标签'

            return next()
        } catch (msg) {
            respond(res, {message: msg,
                data: req.body.data
            })
        }
    },
    Delete: async (req, res, next) => {
        let id = req.body.id
        try {
            if (!id || id == '') throw '必要参数id' 

            if (!await Tag.findById(id)) throw '没有此标签'

            return next()
        } catch (msg) {
            respond(res, {message: msg,
                data: req.body.data
            })
        }
    }
}