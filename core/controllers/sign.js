import { User } from '../models'
import { orUserName, orPwd, orEmail } from '../utils'
/**
 * 注册
 * @param  {[type]}  req [description]
 * @param  {[type]}  res [description]
 * @return {Promise}     [description]
 */
export const signup = async (req, res) => {
    try {
        let user = await new User({
            username: req.body.username,
            email: req.body.email
        })
        await User.signUp(user, req.body.pwd)
    } catch (error) {
        return req.cute.unAuth(error)
    }
    req.flash('message', '注册成功')
    res.redirect('/signupdown')
}

export const signout = async (req, res, next) => {
    res.clearCookie('connect.rid', { path: '/', httpOnly: true})
    res.clearCookie('is_auth', { path: '/', httpOnly: true})
    req.redis.destroy()
    return req.cute.ok({
        message: '退出成功'
    })
}

export const signin = async (req, res) => {
    let info
    try {
        info = await User.signin(req.body.username, req.body.pwd)
    } catch (error) {
        return req.cute.unAuth(error)
    }
    res.cookie('is_auth', true, req.redis.cookie)
    req.redis.set('isAuthenticated', true)
    req.redis.set('authInfo', {
        isOauth: false,
        userId: info.data._id + ''
    })
    return res.redirect('/')
}

/**
 * 验证表单
 * @param  {[type]}  req [description]
 * @param  {[type]}  res [description]
 * @return {Promise}     [description]
 */
export const validator = async (req, res) => {
    try {
        if (req.query.resource === 'signup') {
            await veliSignUp(req.body)
        } else {
            await veliSignIn(req.body)
        }
    } catch (error) {
        return req.cute.ok({
            validator: false,
            errorMessage: error
        })
    }
    return req.cute.ok({
        validator: true
    })
}
/**
 * 验证中间件
 * @type {Object}
 */
export const verify = {
    signup: async (req, res, next) => {
        try {
            await veliSignUp(req.body)
        } catch (error) {
            return req.cute.unAuth({
                message: error
            })
        }
        next()
    },
    signin: async (req, res, next) => {
        try {
            await veliSignIn(req.body)
        } catch (error) {
            return req.cute.unAuth({
                message: error
            })
        }
        next()
    }
}

async function veliSignUp (data) {
    let username = data.username || null
    let pwd = data.pwd || null
    let email = data.email || null
    if (!orUserName(username))
        throw '用户名输入有误'
    if (!orPwd(pwd))
        throw '密码输入有误'
    if (!orEmail(email))
        throw '邮箱输入有误'
    if (await User.findOne({ username: username }))
        throw '用户名已存在'
    if (await User.findOne({ email: email }))
        throw '邮箱已被注册'

    return true
}
async function veliSignIn (data) {
    let username = data.username || null
    let pwd = data.pwd || null
    if (!orUserName(username))
        throw '用户名输入有误'
    if (!orPwd(pwd))
        throw '密码输入有误'
    if (!await User.findOne({ username: username }))
        throw '用户名不存在'

    return true
}
