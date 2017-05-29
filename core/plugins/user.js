import User from '../models/user'
import crypto from 'crypto'
import { filterObj } from '../utils'
import respond from '../middleware/respond'
import config from '../../config'
let userArr = ['_id', 'nickname', 'username', 'email', 'location', 'website', 'created_at', 'updated_at', 'login_at', 'cover', 'avatar', 'description']

export default async function (schema, options) {
    // 模型的注册方法
    schema.statics.signUp = async function (user, pwd) {
        if (!user instanceof this) {
            user = new this(user)
        }
        await user.setPassword(user, pwd)
        return true
    }
    // 模型的用户名查找方法
    schema.statics.findByUsername = async function (userName) {
        let userInfo = await this.findOne({ username: userName })
        return userInfo
    }
    schema.methods.setPassword = async function (user, pwd) {
        // 生成随机数
        let salt = await crypto.randomBytes(32).toString('hex')
        let hash = await crypto.pbkdf2Sync(pwd, salt, 23333, 32, 'sha512').toString('hex')
        user.salt = salt
        user.hash = hash
        await user.save()
        return true
    }
    schema.statics.signin = async function (userName, pwd) {
        let userInfo = await this.findOne({ username: userName })
        let salt = userInfo.salt

        let hash = await crypto.pbkdf2Sync(pwd, salt, 23333, 32, 'sha512').toString('hex')

        if (hash !== userInfo.hash) throw 'pwdIncorrect'

        userInfo.login_at = Date.now()
        userInfo.save()
        let data = filterObj(userInfo, userArr)
        return {
            data: data
        }
    }
    schema.statics.authenticate = async function (req, res, next) {
        try {
            req.cookies.token || req.headers.authorization
        } catch (error) {
            return respond(res, [401, {
                message: '注册失败'
            }])
        }
        next()
    }
}
