import setting from '../models/setting'

let globalVar = async (req, res) => {
    let isHtml = /text\/html/g
    if (isHtml.test(req.headers.accept)) {
        res.locals.url = res.url
    }
    let info = await setting.find()
    res.locals.blog = {
        title: info[0].title,
        profile: info[0].profile,
        cover: info[0].cover
    }
}

export default {
    globalVar
}