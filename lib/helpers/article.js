export default function (type, options) {
    let data = type.data.root.article
    data.blog = type.data.root.blog
    data.class = type.data.root.bodyClass
    data.url = type.data.root.url
    type.data.fn = data
    return type.fn(data)
}