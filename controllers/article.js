import { article } from '../api'
import respond from '../util/respond'

export default {
    all: async (req, res) => {
        article.all(parseInt(req.query.limit) || null, parseInt(req.query.page) || null)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    one: async (req, res) => {
        if (req.params.id) {
            article.oneId(req.params.id)
                .then(ctx => {
                    respond(res, ctx, true)
                })
                .catch(msg => {
                    respond(res, msg)
                })
        } else {
            article.oneSlug(req.params.slug)
                .then(ctx => {
                    respond(res, ctx, true)
                })
                .catch(msg => {
                    respond(res, msg)
                })
        }
    },
    create: async (req, res) => {
        let data = req.body
        data.data.author ? data.data.author : data.data.author = req.user._id
        
        article.create(data.data)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    update: async (req, res) => {
        let data = req.body
        data.data.author ? data.data.author : data.data.author = req.user._id
        
        article.update(data.id, data.data)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                console.log(msg)
                respond(res, msg)
            })
    },
    delete: async (req, res) => {
        let id = req.body.id
        article.delete(id)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    create_verify: async (req, res, next) => {
        article.create_verify(req.body)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    update_verify: async (req, res, next) => {
        article.update_verify(req.body)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    delete_verify: async (req, res, next) => {
        article.delete_verify(req.body)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    }
}