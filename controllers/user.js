import { user } from '../api'
import respond from '../util/respond'

export default {
    find: async (req, res) => {
        if (!req.user) {
            respond(res, '禁止')
        }
        await user.find(req.user._id)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    update: async (req, res) => {
        await user.update(req.user._id, req.body.data)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    }
}