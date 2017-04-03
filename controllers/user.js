import { user } from '../api'
import respond from '../lib/util/respond'

export let Get = async (req, res) => {
    try {
        let ctx = await user.Get(req.user._id)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Put = async (req, res) => {
    try {
        let ctx = await user.Put(req.user._id, req.body.data)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}