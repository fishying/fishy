export default function (type, options) {
    let data = type.data.root.meta.prev
    type.data.fn = data
    if (!data) {
        return null
    } else {
        return type.fn(data)
    }
}