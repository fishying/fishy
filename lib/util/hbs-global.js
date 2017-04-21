import setting from '../../models/setting'

let globalVar = async (req, res) => {
    let isHtml = /text\/html/g
    if (isHtml.test(req.headers.accept)) {
        res.locals.url = req.url
    }
    let info = await setting.find()

    if (info.length) {
        res.locals.blog = {
            title: info[0].title,
            description: info[0].description,
            cover: info[0].cover,
            logo: info[0].logo,
            keywords: info[0].keywords,
            url: info[0].url,
            navigation: info[0].navigation
        }
    }
}

export default {
    globalVar
}