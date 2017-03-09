import bodyParser from 'body-parser'
import '../models'
import fp from 'path'
import morgan from 'morgan'

import RateLimit from 'express-rate-limit'
// import restc from 'restc'

const limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes 
    max: 100, // limit each IP to 100 requests per windowMs 
    delayMs: 0, // disable delaying - full speed until the max limit is reached 
    message: '可恶，你为什么调戏我的服务器！'
})

import session from 'express-session'
import config from '../config.json'
const MongoStore = require('connect-mongo')(session)

// passport
import passport from './passport'

function relative(path) {
    return fp.join(__dirname, path)
}

export default (app) => {
    app.use(limiter)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    // app.use(restc.express())
    app.use(session({
        secret: 'wanan',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: `mongodb://${config.host}:${config.port}/${config.db}`,
        }), 
        cookie: {maxAge:180*60*1000} //store保存时间
    }))

    app.set('accounts_views', relative('../views/accounts'))
    app.set('frontend_views', relative(`../views/theme/${config.theme}`))
    app.set('view engine', '.hbs')

    // 默认hbs
    app.use(morgan('dev'))
    app.use(passport.initialize())
    app.use(passport.session())
}