import axios from '../middleware/axios'
import { User } from '../models'
import { githubInfoFoLocal } from '../utils'
/**
 * Created by yuer on 2017/5/26.
 */
let userInfoGraphql = `
query {
    viewer {
        login
        avatarUrl
        name
        email
        bio
        websiteUrl
        databaseId
    }
}`
export const github = async (req, res, error, token) => {
    if (error) {
        return req.cute.unAuth({
            message: '认证失败'
        })
    }
    try {
        let cb = await axios.post('https://api.github.com/graphql', {
            query: userInfoGraphql
        }, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        let userInfo = cb.data.viewer
        let user
        user = await User.findOne({'github_info.databaseId': userInfo.databaseId})
        // 假如有用户就直接登录，没有就新建一个用户
        if (!user) {
            user = await new User({
                ...githubInfoFoLocal(userInfo),
                github_info: userInfo
            })
        }
        res.cookie('is_auth', true, req.redis.cookie)
        req.redis.set('isAuthenticated', true)
        req.redis.set('authInfo', {
            isOauth: true,
            userId: user._id + ''
        })
        return res.redirect('/')
    } catch (err) {
        req.cute.unAuth({
            message: '认证失败',
            errData: err
        })
    }
}