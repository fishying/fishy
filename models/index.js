import mongoose from 'mongoose'
import config from '../config.json'

import tag from './tag'
import article from './article'
import user from './user'
import setting from './setting'


mongoose.connect(`mongodb://${config.username}:${config.pwd}@${config.host}:${config.port}/${config.db}`)

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