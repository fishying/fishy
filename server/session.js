import cookie from 'cookie'
import uid from 'uid-safe'
import Redis from 'ioredis'
import parseUrl from 'parseurl'
import signature from 'cookie-signature'

export default function (options) {
    let opts = options || {}
    let name = opts.name = opts.name || opts.key || 'connect.rid'
    let secret = opts.secret
    let redis = new Redis()
    let cookieOtp = options.cookie
    return async function(req, res, next) {
        try {
            let originalPath = parseUrl.original(req).pathname
            if (originalPath.indexOf('/') !== 0) return next()

            let redisId = req.redisId = getCookie(req, name, secret)
            if (!redisId) {
                redisId = req.redisId = await setredisId()
            }
            setCookie(res, name, redisId, secret, cookieOtp)
            req.redisCon = redis
            req.redis = await new _redis(req, res, opts).init()
            next()
        } catch (err) {
            console.error(err)
        }
    }
}
/**
 * 获取cookie
 * @param  {[type]} req    [description]
 * @param  {[type]} name   [description]
 * @param  {[type]} secret [description]
 * @return {[type]}        [description]
 */
function getCookie (req, name, secret) {
    let headers = req.headers.cookie
    if (headers) {
        let cookies = cookie.parse(headers)
        let raw = cookies[name]
        if (raw) {
            if (raw.substr(0, 2) === 'r:') {
                return signature.unsign(raw.slice(2), secret)
            }
        }
    }
    return null
}
/**
 * 生成cookies，设置响应头
 * @param {[type]} res       [description]
 * @param {[type]} name      [description]
 * @param {[type]} id        [description]
 * @param {[type]} secret    [description]
 * @param {[type]} cookieOtp [description]
 */
function setCookie (res, name, id, secret, cookieOtp) {
    let coo = 'r:' + signature.sign(id, secret)
    let data = cookie.serialize(name, coo, cookieOtp)
    let prev = res.getHeader('set-cookie') || []
    let header = Array.isArray(prev) ? prev.concat(data) : [prev, data]
    res.setHeader('set-cookie', header)
}
/**
 * 生成一个uid
 * @return {Boolean} [description]
 */
async function setredisId () {
    return await uid(24)
}
class _redis {
    constructor (req, res, options) {
        this.res = res
        this.req = req
        this.id = req.redisId
        this.redis = req.redisCon
        this.cookies = req.cookies
        this.options = options
        this.data = {}
    }
    async init () {
        if (await this.redis.hsetnx(this.id, 'cookies', JSON.stringify(this.options))) {
            await this.redis.expire(this.id, this.options.cookie.maxAge)
        }
        this.data = await this.hgetall()
        Object.keys(this.data)
            .forEach(key => {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: true,
                    get: () => this.data[key],
                    set: (val) => this.data[key] = val
                })
            })
        return this
    }
    async set (type, msg) {
        let pid = this.id
        if (msg instanceof Object || msg instanceof Array) {
            msg = JSON.stringify(msg)
        }
        return await this.redis.hset(pid, type, msg)
    }
    async get (type) {
        let pid = this.id
        let data = await this.redis.hget(pid, type)
        if (isObject(data)) {
            data = JSON.parse(data)
        }
        if (isArray(data)) {
            data = JSON.parse(data)
        }
        return data
    }
    async hmset (data) {
        return await this.redis.hmset(this.id, data)
    }
    async hgetall () {
        let data =  await this.redis.hgetall(this.id)
        let newData = {}
        Object.keys(data)
            .forEach(key => {
                if (isObject(data[key])) {
                    newData[key] = JSON.parse(data[key])
                } else if (isArray(data)) {
                    newData[key] = JSON.parse(data[key])
                } else {
                    newData[key] = data[key]
                }
            })
        return newData
    }
    async hdel (type) {
        return await this.redis.hdel(this.id, type)
    }
    async destroy () {
        this.res.clearCookie(this.options.name, { path: '/' })
        return await this.redis.del(this.id)
    }
}
function isObject (text) {
    try {
        if (JSON.parse(text) instanceof Object)
            return true
    } catch (error) {
        return false
    }
}
function isArray (text) {
    try {
        if (JSON.parse(text) instanceof Array)
            return true
    } catch (error) {
        return false
    }
}
