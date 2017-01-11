import bodyParser from 'body-parser'
import '../models'
import hbs from 'express-hbs'
import fp from 'path'
import morgan from 'morgan'
import session from 'express-session'
import config from '../config.json'
const MongoStore = require('connect-mongo')(session)

function relative(path) {
    return fp.join(__dirname, path)
}

export default (app) => {
    app.use(session({
        secret: 'wanan',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: `mongodb://${config.host}:${config.port}/${config.db}`,
        }), 
        cookie:{maxAge:180*60*1000} //store保存时间
    }))

    hbs.registerHelper('get', function (type, options) {
        console.log(options)
        return 'asdfsdf'
    })

    app.engine('hbs', hbs.express4({
        partialsDir: relative('../view'),
        layoutsDir: relative('../view'),
        defaultLayout: relative('../view/default.hbs')
    }))
    
    app.set('view engine', 'hbs')
    app.set('views', relative('../view'))

    // 默认hbs
    app.use(morgan('dev'))
    app.use(bodyParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
}