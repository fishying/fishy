import { setting } from '../api'
import respond from '../util/respond'

export let GetAll = async (req, res) => {
    try {
        let ctx = await setting.GetAll()
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Put = async (req, res) => {
    let data = req.body
    try {
        let ctx = await setting.Put(data.id, data.data)
        respond(res, ctx, true)
    } catch (msg) {
        respond(res, msg)
    }
}

export let Verify = {
    Put: async (req, res, next) => {
        let body = req.body
        try {
            if (!body.data) throw '参数出错'

            if (!body.id || body.id == '') throw '必要参数id' 
            return next()
        } catch (msg) {
            respond(res, msg)
        }
    }
}
