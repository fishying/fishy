import md5 from 'md5'

let userPwdMd5 = async function (schema, options) {
    schema.pre('save', async function (next) {
        this.password = await md5(md5(this.password))
        next()
    })
}

export default userPwdMd5