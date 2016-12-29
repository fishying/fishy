import express from 'express'

import bodyParser from 'body-parser'
import './models/index.js'
import router from './routes'
import hbs from 'express-hbs'
import fp from 'path'
import morgan from 'morgan'

const app = new express()

function relative(path) {
    return fp.join(__dirname, path)
}

app.engine('hbs', hbs.express4({
    partialsDir: relative('view'),
    layoutsDir: relative('view'),
    defaultLayout: relative('view/default.hbs')
}))
app.set('view engine', 'hbs')
app.set('views', relative('view'))

// 默认hbs
app.use(bodyParser.json())
app.use(morgan('dev'))

router(app)

app.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!')
})