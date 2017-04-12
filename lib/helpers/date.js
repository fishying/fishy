import moment from 'moment'

export default function (type) {
    let text = this.create_at

    let format = type.hash.format || 'YYYY-MM-DD'
    let g = type.hash.global || 'zh-cn'
    moment.locale(g)
    return type.hash.now ? moment(text).fromNow() : moment(text).format(format)
} 