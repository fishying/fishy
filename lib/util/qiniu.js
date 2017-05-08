import qn from 'qn'
import { qiniu as qiniuConfig } from '../../config.js'
import fs from 'fs'
var client = qn.create({
    accessKey: qiniuConfig.ACCESS_KEY,
    secretKey: qiniuConfig.SECRET_KEY,
    bucket: qiniuConfig.bucket,
    origin: qiniuConfig.origin,
    uploadURL: qiniuConfig.uploadURL
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
