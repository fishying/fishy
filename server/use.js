import bodyParser from 'body-parser'
import '../models'
import hbs from 'express-hbs'
import fp from 'path'
import morgan from 'morgan'
import restc from 'restc'

import session from 'express-session'
import config from '../config.json'
import helpers from '../helpers'
const MongoStore = require('connect-mongo')(session)

// passport
import passport from './passport'

function relative(path) {
    return fp.join(__dirname, path)
}

export default (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(restc.express())
    app.use(session({
        secret: 'wanan',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: `mongodb://${config.host}:${config.port}/${config.db}`,
        }), 
        cookie: {maxAge:180*60*1000} //store保存时间
    }))
    helpers(hbs)
    app.engine('hbs', hbs.express4({
        partialsDir: relative(`../view/theme/${config.theme}/partials`),
        layoutsDir: relative(`../view/theme/${config.theme}`),
        defaultLayout: relative(`../view/theme/${config.theme}/default.hbs`)
    }))
    
    app.set('view engine', 'hbs')
    app.set('views', relative('../view'))

    // 默认hbs
    app.use(morgan('dev'))
    app.use(passport.initialize())
    app.use(passport.session())
}