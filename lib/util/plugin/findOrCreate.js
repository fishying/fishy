let findOrCreate = async (schema, options) => {
    schema.statics.findOrCreate = async function (conditions, list, options) {
        let data = await this.findOne(conditions)
        return data || (list && await this.create(list) || await this.create(conditions))
    }
}

export default findOrCreate 