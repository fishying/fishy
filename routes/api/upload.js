import express from 'express'
import multer  from 'multer'
import { upload as uploadQiniu } from '../../util/qiniu.js'
const router = express.Router()
var storage = multer.diskStorage({
//设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }, 
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split('.')
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})

let upload = multer({storage: storage})

router.route('/')
    .post(upload.single('avatar'), async (req, res, next) => {
        uploadQiniu(req.file.originalname, `${req.file.destination}${req.file.filename}`, function (e) {
            return res.json(e)
        })
    })

export default router