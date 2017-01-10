import { user } from '../models'
import md5 from 'md5'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export default {
    /**
     * register
     * 用户注册
     * 
     * @param {String} name
     * @param {String} password
     * @param {String} email
     * @returns Promise
     */
    register: async (name, password, email) => {
        if (!name || name === '') {
            throw '没有填写名字'
        }
        if (!password || password === '') {
            throw '没有填写密码'
        }
        if (!email || email === '') {
            throw '没有填写email'
        } else if (!validator.isEmail(email)) {
            throw 'email格式不正确'
        }

        let userInfo = {
            name: name,
            password: md5(md5(password)),
            email: email
        }

        await user.findOne({name: userInfo.name})
            .then(data => {
                if (data) {
                    throw '用户已存在'
                }
            })

        await user.findOne({email: userInfo.email})
            .then(data => {
                if (data) {
                    throw '邮箱已注册'
                }
            })

        await user.create(userInfo)
            .then(() => {
                return '注册成功'
            })
            .catch(() => {
                return '注册成功'
            })
    },
    /**
     * verify
     * 验证是否登陆
     * 
     * @param {Body} req
     * @returns
     */
    verify: async (req) => {
        let token = req.session.token || null
        if (token) {
            try {
                var decoded = jwt.verify(token, 'simple-authentication')
            } catch (err) {
                throw 'token验证失败'
            }
            try {
                let e = await user.findOne({name: decoded.name})
                    .select({password: 0})
                    .exec()
                if (e) {
                    return Promise.resolve()
                } else {
                    throw 'token验证失败'
                }
            } catch (err) {
                throw 'token验证失败'
            }
        } else {
            throw 'token验证失败'
        }
    },
    /**
     * login
     * 用户登录
     * 
     * @param {Body} req
     * @returns
     */
    login: async (req) => {
        let name = req.body.name
        let password = req.body.password
        if (!name || name === '') {
            throw '没有填写名字'
        }
        if (!password || password === '') {
            throw '没有填写密码'
        }
        let userInfo = {
            name: name,
            password: md5(md5(password))
        }
        try {
            let info = await user.findOne({name: userInfo.name})
            if (info !== null) {
                if (info.password !== userInfo.password) {
                    throw '密码错误'
                } else {
                    let token = jwt.sign({
                        name: info.name
                    }, 'simple-authentication')
                    req.session.token = token
                    
                    return '登录成功'
                }
            } else {
                return '没有此账号'
            }
        } catch (err) {
            console.log(err)
            throw '登陆失败'
        }
    }
}