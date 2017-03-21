import express from 'express'

import router from './routes'
import use from './server/use'
import logger from './logger'
import './server/mailer.js'
import config from './config.json'

const app = new express()

use(app)

router(app)

app.listen(config.port, function(){
    console.log(`App (dev) is now running on port ${config.port}!`)
})