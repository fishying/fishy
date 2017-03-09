import { setting as Setting } from '../models'

export default {
    all: async () => {
        let data = await Setting.findOne()
        return {
            setting: data
        }
    },
    update: async (id, data) => {
        let cbk = await Setting
            .findByIdAndUpdate(id, data, {new: true})
        return {
            message: '修改设置成功',
            data: cbk
        }
    },
    update_verify: async (body) => {
        if (!body.data) throw '参数出错'
        
        if (!body.id || body.id == '') throw '必要参数id' 

        return true
    },
}