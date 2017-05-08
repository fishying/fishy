/**
 * Created by yuer on 2017/5/8.
 */
const config = {
    app: {
        port: 2333,
        theme: 'casper'
    },
    // mongodb设置
    mongo: {
        host: 'localhost',  // 服务器
        port: 27017,        // 服务器端口
        db: 'fishy',        // 数据库名称
        username: 'fishy',  // 数据库账号
        pwd: 'fishy'        // 数据库账号密码
    },
    email: {
        service: null,
        host: '',       // 邮箱服务器
        port: 465,      // 邮箱服务器端口
        auth: {
            user: '',   // 用户名
            pass: ''    // 用户密码
        }
    },
    qiniu: {
        ACCESS_KEY: '', // ACCESS_KEY
        SECRET_KEY: '', // SECRET_KEY
        bucket: 'fishy',// 上传的空间名
        origin: '',     //
        uploadURL: ''   //
    }
}
export default config

export const app = config.app
export const mongo = config.mongo
export const email = config.email
export const qiniu = config.qiniu