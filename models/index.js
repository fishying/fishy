import mongoose from 'mongoose'
import { mongo as mongoConfig } from '../config.js'

import tag from './tag'
import article from './article'
import user from './user'
import setting from './setting'

mongoose.connect(`mongodb://${mongoConfig.username}:${mongoConfig.pwd}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
    console.log('MongoDB Opened!')
})

export {
    tag,
    article,
    user,
    setting
}