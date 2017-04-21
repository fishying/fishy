import express from 'express'

import router from './routes'
import use from './server/use'
import './server/mailer.js'
import config from './config.json'

import logger from './logger'

const app = new express()

use(app)

router(app)

process.on('SIGINT', () => {
    console.log('bye~')
    process.exit()
})

app.listen(config.port, function(){
    console.log(`biu~ ${config.port}!`)
})