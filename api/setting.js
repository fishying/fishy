import { setting as Setting } from '../models'

export let GetAll = async () => {
    let data = await Setting.findOne()
    return {
        setting: data
    }
}

export let Put = async (id, data) => {
    let cbk = await Setting
        .findByIdAndUpdate(id, data, {new: true})
    return {
        message: '修改设置成功',
        data: cbk
    }
}
