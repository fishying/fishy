import express from 'express'

import router from './routes'
import use from './server/use'
import './server/mailer.js'
import { app as appConfig } from './config.js'

import './logger'

const app = new express()

use(app)

router(app)

process.on('SIGINT', () => {
    console.log('bye~')
    process.exit()
})

app.listen(appConfig.port, function(){
    console.log(`biu~ ${appConfig.port}!`)
})