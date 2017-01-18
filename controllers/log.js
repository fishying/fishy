import User from '../models/user'
import respond from '../util/respond'
import passport from 'passport'

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
        if (req.user) {
            return res.json({
                message: '登录成功'
            })
        } else {
            respond(res, [401, {message: '登录失败'}])
        }
    }
}