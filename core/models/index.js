import mongoose from 'mongoose'
import config from '../../config'

mongoose.connect(`mongodb://${config.mongodb.username}:${config.mongodb.pwd}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`)

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', async () => {
    console.log('MongoDB Opened!')
})

export { default as User } from './user'
