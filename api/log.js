import { user } from '../models'
import md5 from 'md5'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export default {
    register: async (name, password, email) => {
        if (!name || name === '') {
            return Promise.reject('没有填写名字')
        }
        if (!password || password === '') {
            return Promise.reject('没有填写密码')
        }
        if (!email || email === '') {
            return Promise.reject('没有填写email')
        } else if (!validator.isEmail(email)) {
            return Promise.reject('email格式不正确')
        }

        let userInfo = {
            name: name,
            password: md5(md5(password)),
            email: email
        }

        await user.findOne({name: userInfo.name})
            .then(data => {
                if (data) {
                    return Promise.reject('用户已存在')
                }
            })

        await user.findOne({email: userInfo.email})
            .then(data => {
                if (data) {
                    return Promise.reject('邮箱已注册')
                }
            })

        await user.create(userInfo)
            .then(() => {
                return Promise.resolve('注册成功')
            })
            .catch(() => {
                return Promise.resolve('注册成功')
            })
    },
    verify: async (req) => {
        let token = req.session.token || null
        if (token) {
            try {
                var decoded = jwt.verify(token, 'simple-authentication')
            } catch (err) {
                return Promise.reject('token验证失败')
            }
            try {
                let e = await user.findOne({name: decoded.name})
                    .select({password: 0})
                    .exec()
                if (e) {
                    return Promise.resolve()
                } else {
                    return Promise.reject('token验证失败')
                }
            } catch (err) {
                return Promise.reject('token验证失败')
            }
        } else {
            return Promise.reject('token验证失败')
        }
    },
    login: async (req) => {
        let name = req.body.name
        let password = req.body.password
        if (!name || name === '') {
            return Promise.reject('没有填写名字')
        }
        if (!password || password === '') {
            return Promise.reject('没有填写密码')
        }
        let userInfo = {
            name: name,
            password: md5(md5(password))
        }
        try {
            let info = await user.findOne({name: userInfo.name})
            if (info !== null) {
                if (info.password !== userInfo.password) {
                    return Promise.reject('密码错误')
                } else {
                    let token = jwt.sign({
                        name: info.name
                    }, 'simple-authentication')
                    req.session.token = token
                    
                    return Promise.resolve('登录成功')
                }
            } else {
                return '没有此账号'
            }
        } catch (err) {
            console.log(err)
            return Promise.reject('登陆失败')
        }
    }
}