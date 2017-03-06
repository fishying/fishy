import mongoose from 'mongoose'
import config from '../config.json'

import tag from './tag'
import article from './article'
import user from './user'
import setting from './setting'


mongoose.Promise = global.Promise

mongoose.plugin(require('mongoose-deep-populate'))

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
    console.log('MongoDB Opened!')
    let isInit = await setting.find()
    if (!isInit.length) {
        await setting.create({})
    }
})

export {
    tag,
    article,
    user,
    setting
}