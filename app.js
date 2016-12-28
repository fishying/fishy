import express from 'express'

import bodyParser from 'body-parser'
import './models/index.js'
import router from './routes'

import morgan from 'morgan'

const app = new express()

app.use(bodyParser.json())
app.use(morgan('dev'))

router(app)

app.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!')
})