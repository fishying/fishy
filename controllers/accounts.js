import respond from '../lib/util/respond'

import { setting as Setting, user as User } from '../models'

import passport from '../server/passport'

import validator from 'validator'

/** 
 * 注册用户
 * 
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let register = async (req, res) => {
    await User.register(new User({name: req.body.username, email: req.body.email}), req.body.password, (err, account) => {
        if (err) {
            respond(res, err)
        } else {
            return res.json({
                message: '注册成功'
            })
        }
    })
}

/** 
 * 登录用户
 * 
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let login = async (req, res) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return respond(res, [400, {message: '登录失败', info: err}])
        }
        if (!user) {
            return respond(res, [400, {message: '密码错误'}])
        }
        req.logIn(user, function(err) {
            if (err) {
                return respond(res, [400, {message: '登录失败', info: err}])
            }
            return res.json({
                message: '登录成功'
            })
        })
    })(req, res)
}

/** 
 * 登出
 * 
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let logout = async (req, res) => {
    req.logout()
    res.json({
        message: '退出成功'
    })
}

/** 
 * 修改密码
 * 
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let resetPwd = async (req, res) => {
    req.user.setPassword(req.body.password, (cbk) => {
        req.user.save((err) => {
            if (err) {
                return res.status(400).send({ message: err })
            }
            return res.json({
                message: '修改成功',
                data: req.user
            })
        })
    })
}

/** 
 * 安装
 * 
 * @param  {[req]}
 * @param  {[res]}
 * @return {[Promise]}
 */
export let install = async (req, res) => {
    let blogInfo = req.body.blog
    let adminInfo = req.body.admin
    try {
        await Setting.create(blogInfo)
        await User.register(new User({name: adminInfo.name, email: adminInfo.email}), adminInfo.password, (err, account) => {
            if (err) {
                respond(res, err)
            } else {
                return res.json({
                    message: '安装成功'
                })
            }
        })
    } catch (err) {
        respond(res, err)
    }
}

/** 
 * 验证
 * 
 */
export let Verify = {
    install: async (req, res, next) => {
        let blogInfo = req.body.blog
        let adminInfo = req.body.admin
        let cbk = await Setting.find()
        if (cbk.length > 0) return res.status(401).json({message: '已经安装过了'})

        if (!blogInfo || !adminInfo) {
            return res.status(401).json({message: '参数不正确'})
        }
        if (!adminInfo.hasOwnProperty('email')) {
            return res.status(401).json({message: '管理员邮箱没填写'})
        } else if (!validator.isEmail(adminInfo.email)) {
            return res.status(401).json({message: '管理员邮箱填写不正确'})
        }

        if (!adminInfo.hasOwnProperty('name')) {
            return res.status(401).json({message: '管理员账号没填写'})
        }

        if (!adminInfo.hasOwnProperty('password')) {
            return res.status(401).json({message: '管理员密码没填写'})
        } else if (!validator.isLength(adminInfo.password, {min:6, max: 16})) {
            return res.status(401).json({message: '6-16'})
        }


        if (!blogInfo.hasOwnProperty('title')) {
            return res.status(401).json({message: '博客标题没填写'})
        }

        if (!blogInfo.hasOwnProperty('url')) {
            return res.status(401).json({message: '博客url没填写'})
        } else if (!validator.isURL(blogInfo.url)) {
            return res.status(401).json({message: '博客url填写有误'})
        }
        next()
    },
    login: async (req, res, next) => {
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
    register: async (req, res, next) => {
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