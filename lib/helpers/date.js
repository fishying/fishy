import moment from 'moment'

export default function (type) {
    let text
    if (type.data.key >= 0) {
        text = type.data.root.article[type.data.key].create_at
    } else {
        text = type.data.root.article.create_at
    }

    let format = type.hash.format || 'YYYY-MM-DD'
    let g = type.hash.global || 'zh-cn'
    moment.locale(g)
    return type.hash.now ? moment(text).fromNow() : moment(text).format(format)
} 