import qn from 'qn'
import config from '../config/qiniu'
import fs from 'fs'
var client = qn.create({
    accessKey: config.ACCESS_KEY,
    secretKey: config.SECRET_KEY,
    bucket: config.bucket,
    origin: config.origin,
    uploadURL: config.uploadURL
})

//构建上传策略函数
export let upload = async (name, filePath, cb) => {
    client.upload(fs.createReadStream(filePath), { key: name }, async (err, result) => {
        if (err) {
            throw err
        } else {
            cb(result)
        }
    })
}
