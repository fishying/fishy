let findOrCreate = async (schema, options) => {
    schema.statics.findOrCreate = async function (conditions, list, options) {
        try {
            let data = await this.findOne(conditions)
            return data || (list && await this.create(list) || await this.create(conditions))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export default findOrCreate 