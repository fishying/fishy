import User from '../models/user'

export let Get = async (id) => {
    let data = await User.findById(id)
        .select('name email slug website cover avatar profile _id description')
        .lean()
    return {
        user: data
    }
}

export let Put = async (id, data) => {
    let cbk = await User
        .findByIdAndUpdate(id, data, {new: true})
    return {
        message: '修改设置成功',
        data: cbk
    }
}