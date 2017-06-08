/**
 * Created by yuer on 2017/5/26.
 */
// rest错误处理

export default function (options) {
    return function(req, res, next) {
        if (req.cute) return next()
        req.cute = new Cute(req, res)
        next()
    }
}
class Cute {
    constructor (req, res) {
        this.req = req
        this.res = res
    }
    async error (code, msg) {
        msg = verifyMsg(msg)
        this.res.status(code).json(msg)
        console.error(msg)
        return this
    }
    async ok (msg) {
        msg = verifyMsg(msg)
        this.res.status(200).json(msg)
        return this
    }
    /**
     * Unauthorized res
     * @param msg
     * @returns {Promise.<void>}
     * @constructor
     */
    async unAuth (msg) {
        this.error(401, msg)
    }
    async forbidden (msg) {
        this.error(403,  msg)
    }
}

function verifyMsg (msg) {
    let msgs = {}
    if (typeof(msg) === 'string') {
        msgs.message = msg
    } else if (msg instanceof Object) {
        msgs = msg
    } else {
        throw '必须是字符串或对象'
    }
    return msgs
}