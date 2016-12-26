import user from '../models/user.js'
import md5 from 'md5'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export default {
    logon: async (ctx) => {
        if (!ctx.request.body.name || ctx.request.body.name === '') {
            return ctx.body = {
                success: false,
                message: '没有填写名字',
            }
        }
        if (!ctx.request.body.password || ctx.request.body.password === '') {
            return ctx.body = {
                success: false,
                message: '没有填写密码',
            }
        }
        if (!ctx.request.body.email || ctx.request.body.email === '') {
            return ctx.body = {
                success: false,
                message: '没有填写email',
            }
        } else if (!validator.isEmail(ctx.request.body.email)) {
            return ctx.body = {
                success: false,
                message: 'email格式不正确',
            }
        }

        let userInfo = {
            name: ctx.request.body.name,
            password: md5(md5(ctx.request.body.password)),
            email: ctx.request.body.email
        }

        await user.create(userInfo)
            .then(() => {
                return ctx.body = {
                    success: true,
                    message: '注册成功',
                }
            })
            .catch(err => {
                console.log(err)
                return ctx.body = {
                    success: false,
                    message: '注册失败',
                }
            })
    },
    login: async (ctx) => {
        console.log(ctx)
        if (!ctx.request.body.name || ctx.request.body.name === '') {
            return ctx.body = {
                success: false,
                message: '没有填写名字',
            }
        }
        if (!ctx.request.body.password || ctx.request.body.password === '') {
            return ctx.body = {
                success: false,
                message: '没有填写密码',
            }
        }
        let userInfo = {
            name: ctx.request.body.name,
            password: md5(md5(ctx.request.body.password))
        }
        await user.findOne({name: userInfo.name})
            .then(response => {
                if (response !== null) {
                    if (response.password !== userInfo.password) {
                        return ctx.body = {
                            success: false,
                            message: '密码错误',
                        }
                    } else {
                        let token = jwt.sign(response.name, 'simple')
                        return ctx.body = {
                            success: true,
                            message: '登录成功',
                            token: token
                        }
                    }
                } else {
                    return ctx.body = {
                        success: false,
                        message: '没有此账号',
                    }
                }
            })
    },
    verify: async (ctx, next) => {
        let token = ctx.request.body.token || ctx.request.header.token
        if (token) {
            try {
                var decoded = jwt.verify(token, 'simple')
            } catch(err) {
                return ctx.body = {
                    success: false,
                    message: 'token验证失败',
                }
            }
            try {
                let e = await user.findOne({name: decoded})
                    .select({password: 0})
                    .exec()
                if (e) {
                    return next()
                } else {
                    return ctx.body = {
                        success: false,
                        message: 'token验证失败',
                    }
                }
            } catch (err) {
                return ctx.body = {
                    success: false,
                    message: 'token验证失败',
                }
            }
        } else {
            return ctx.body = {
                success: false,
                message: '没有token',
            }
        }
    }
}