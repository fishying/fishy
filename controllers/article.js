import article from '../api/article'
import respond from '../util/respond'

export default {
    create: async (req, res) => {
        let data = req.body
        article.create(data.data, data.tag)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    }
}