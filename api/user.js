import User from '../models/user'


export default {
    find: async (id) => {
        let data = await User.findById(id)
            .select('name email slug website cover avater profile _id')
            .lean()
        return {
            user: data
        }
    },
    update: async (id, data) => {
        let cbk = await User
            .findByIdAndUpdate(id, data, {new: true})
        return {
            message: '修改设置成功',
            data: cbk
        }
    }
}