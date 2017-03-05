export default function (type, options) {
    this._block = this._block || {}
    this._block[type] = options.fn(this)
    return null
}