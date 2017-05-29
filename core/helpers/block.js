export default function (type) {
    try {
        return this._block[type] || null
    } catch (e) {
        return null
    }
}
