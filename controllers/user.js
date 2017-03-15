import { user } from '../api'
import respond from '../util/respond'

export let Get = async (req, res) => {
    if (!req.user) {
        respond(res, '禁止')
    }
    try {
        let ctx = await user.Put(req.user._id)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Put = async (req, res) => {
    if (!req.user) {
        respond(res, '禁止')
    }
    try {
        let ctx = await user.Put(req.user._id)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}