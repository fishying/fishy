export default function (options) {
    return function(req, res, next) {
        if (req.flash) return next()
        req.flash = _flash
        next()
    }
}

async function _flash (type, msg) {
    let msgs = await this.redis.get('flash') || {}
    if (type && msg) {
        msgs[type] = msg
        await this.redis.set('flash', msgs)
        return this
    } else if (type) {
        let m = msgs[type]
        delete msgs[type]
        await this.redis.set('flash', msgs)
        console.log(m)
        return m
    } else {
        msgs = {}
        await this.redis.set('flash', msgs)
        return msgs
    }
}
