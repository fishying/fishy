import tag from '../middleware/tag'
import respond from '../util/respond'


export default {
    /**
     * create
     * tag的添加
     * 
     * @param {any} req
     * @param {any} res
     */
    create: async (req, res) => {
        tag.create(req.body.data)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    update: async (req, res) => {
        tag.update(req.body.id, req.body.data)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    delete: async (req, res) => {
        tag.delete(req.body.id)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    create_verify: async (req, res, next) => {
        tag.create_verify(req.body.data)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    update_verify: async (req, res, next) => {
        tag.update_verify( req.body.id, req.body.data)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    delete_verify: async (req, res, next) => {
        tag.delete_verify( req.body.id, req.body.data)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    }
}