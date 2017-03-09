import { setting } from '../api'
import respond from '../util/respond'

export default {
    all: async (req, res) => {
        setting.all()
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    update: async (req, res) => {
        let data = req.body

        setting.update(data.id, data.data)
            .then(ctx => {
                respond(res, ctx, true)
            })
            .catch(msg => {
                respond(res, msg)
            })
    },
    update_verify: async (req, res, next) => {
        setting.update_verify(req.body)
            .then(() => {
                next()
            })
            .catch(msg => {
                respond(res, msg)
            })
    }
}