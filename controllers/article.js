import article from '../middleware/article'
import respond from '../util/respond'

export default {
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
    }
}