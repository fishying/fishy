import moment from 'moment'

export default function (type, options) {
    let text = type.data.root.article[type.data.key].create_at
        ? type.data.root.article[type.data.key].create_at
        : type.hash.time
    let format = type.hash.format || 'YYYY-MM-DD'
    let g = type.hash.global || 'zh-cn'
    moment.locale(g)
    return type.hash.now ? moment(text).fromNow() : moment(text).format(format)
} 