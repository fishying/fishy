import bodyParser from 'body-parser'
import '../models'
import fp from 'path'
import morgan from 'morgan'
// import restc from 'restc'

import session from 'express-session'
import config from '../config.json'
const MongoStore = require('connect-mongo')(session)

// passport
import passport from './passport'

function relative(path) {
    return fp.join(__dirname, path)
}

export default (app) => {
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