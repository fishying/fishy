import User from '../models/user'
import omit from '../lib/util/omit.js'

const defaultUser = ['slug', 'name', 'email', 'cover', 'avatar', 'description']
export let Get = async (id) => {
    let data = await User.findById(id)
        .select('name email slug website cover avatar profile _id description')
        .lean()
    return {
        user: data
    }
}

export let Put = async (id, data) => {
    data = omit(defaultUser, data)
    let cbk = await User
        .findByIdAndUpdate(id, data, {new: true})
    return {
        message: '修改设置成功',
        data: omit(defaultUser, cbk)
    }
}