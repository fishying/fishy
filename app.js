import express from 'express'

import bodyParser from 'body-parser'
import './models/index.js'
import router from './routes'
import hbs from 'express-handlebars'

import morgan from 'morgan'

const app = new express()

app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs',
    layoutsDir: 'view/',
    partialsDir: 'view/'
}))
app.set('view engine', 'hbs')
// 默认hbs
app.use(bodyParser.json())
app.use(morgan('dev'))

router(app)

app.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!')
})