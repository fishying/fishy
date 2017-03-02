import User from '../models/user'
import respond from '../util/respond'

import passport from '../server/passport'

import validator from 'validator'

export default {
    register: async (req, res) => {
        await User.register(new User({name: req.body.username, email: req.body.email}), req.body.password, (err, account) => {
            if (err) {
                respond(res, err)
            } else {
                return res.json({
                    message: '注册成功'
                })
            }
        })
    },
    login: async (req, res) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return respond(res, [401, {message: '登录失败', info: err}])
            }
            if (!user) {
                return respond(res, [401, {message: '密码错误'}])
            }
            req.logIn(user, function(err) {
                if (err) {
                    return respond(res, [401, {message: '登录失败', info: err}])
                }
                return res.json({
                    message: '登录成功'
                })
            })
        })(req, res)
    },
    logout: async (req, res) => {
        req.logout()
        res.json({
            message: '退出成功'
        })
    },
    login_verify: async (req, res, next) => {
        if (!validator.isLength(req.body.username, {min:1, max: undefined})) {
            return res.status(401).json({message: '请填写正确的用户名'})
        } else {
            let i = await User.findOne({name: req.body.username})
            if (!i) {
                return res.status(401).json({message: '用户名不正确'})
            }
        }

        if (!validator.isLength(req.body.password, {min:6, max: 16})) {
            return res.status(401).json({message: '请填写正确的密码'})
        }

        next()
    },
    register_verify: async (req, res, next) => {
        if (!validator.isLength(req.body.username, {min:1, max: undefined})) {
            return res.status(401).json({message: '请填写正确的用户名'})
        }
        if (!validator.isLength(req.body.email, {min:3, max: undefined})) {
            return res.status(401).json({message: '请填写邮箱'})
        } else if (!validator.isEmail(req.body.email)) {
            return res.status(401).json({message: '请填写正确的邮箱格式'})
        }
        if (!validator.isLength(req.body.password, {min:6, max: 16})) {
            return res.status(401).json({message: '请填写正确的密码'})
        }

        next()
    }
}