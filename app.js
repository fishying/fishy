import express from 'express'

import router from './routes'
import use from './server/use'
import logger from './logger'
import './server/mailer.js'
const app = new express()

use(app)

router(app)

app.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!')
})