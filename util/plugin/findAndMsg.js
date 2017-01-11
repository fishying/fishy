
let findAndMsg = async (schema, options) => {
    /**
     * findAndMsg
     * 假如查询到返回一个throw
     * @param {Object} conditions
     * @param {String} msg
     * @param {any} options
     * @returns throw || true
     */
    schema.statics.findAndMsg = async function (conditions, msg, options) {
        let data = await this.findOne(conditions)
        if (data) {
            throw msg
        } else {
            return true
        }
    }
}

export default findAndMsg 