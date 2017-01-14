import user from '../models/user'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import md5 from 'md5'

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
            throw [401, {
                message: 'email格式不正确'
            }]
        }
        let userInfo = {
            name: name,
            password: password,
            email: email
        }
        
        await user.findAndMsg({email: userInfo.email}, '邮箱已注册')

        await user.create(userInfo)
        return {message: '注册成功'}
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
        try {
            var decoded = jwt.verify(token, 'simple-authentication')
        } catch (err) {
            throw [401, {
                message: 'token验证失败'
            }]
        }

        let e = await user.findOne({name: decoded.name})
            .select({password: 0})
            .exec()
        if (e) {
            return e
        } else {
            throw [401, {
                message: 'token验证失败'
            }]
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
            throw {
                message: '没有填写名字'
            }
        }
        if (!password || password === '') {
            throw {
                message: '没有填写密码'
            }
        }
        let userInfo = {
            name: name,
            password: password
        }
        let info = await user.findOne({name: userInfo.name})
        
        if (info !== null) {
            if (info.password !== md5(md5(userInfo.password))) {
                throw {
                    message: '密码错误'
                }
            } else {
                let token = jwt.sign({
                    name: info.name
                }, 'simple-authentication')
                req.session.token = token
                
                return {message: '登录成功'}
            }
        } else {
            throw {
                message: '没有此账号'
            }
        }
    }
}