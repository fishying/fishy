import user from '../models/user'
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
            password: password,
            email: email
        }

        // 检测name
        try {
            await user.findAndMsg({name: userInfo.name}, '名称已存在')
        } catch (err) {
            throw err
        }

        // 检测email
        try {
            await user.findAndMsg({email: userInfo.email}, '邮箱已注册')
        } catch (err) {
            throw err
        }

        try {
            await user.create(userInfo)
            return '注册成功'
        } catch (err) {
            throw err
        }
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
            throw 'token验证失败'
        }
        try {
            let e = await user.findOne({name: decoded.name})
                .select({password: 0})
                .exec()
            console.log(e)
            if (e) {
                return e
            } else {
                throw 'token验证失败'
            }
        } catch (err) {
            throw err
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
            password: password
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