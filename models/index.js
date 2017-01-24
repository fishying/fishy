import mongoose from 'mongoose'
import config from '../config.json'

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('MongoDB Opened!')
})

export {tag} from './tag'
export {article} from './article'
export {user} from './user'
export {setting} from './setting'