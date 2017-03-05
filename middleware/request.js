import express from 'express'
import exphbs from 'express-handlebars'
import helpers from '../helpers'

const setAccounts = async (req, res, next) => {
    let app = req.app
    let url = app.get('accounts_views')
    var hbs = exphbs.create({
        helpers: helpers,
        extname: '.hbs',
        layoutsDir: `${url}/layouts`,
        partialsDir: [
            `${url}/partials/`
        ]
    })
    app.engine('.hbs', hbs.engine)
    app.set('views', url)

    app.use('/accounts/assets', express.static(`${url}/assets`))
    next()
}
const setFrontEnd = async (req, res, next) => {
    let app = req.app

    let url = app.get('frontend_views')
    var hbs = exphbs.create({
        helpers: helpers,
        extname: '.hbs',
        layoutsDir: `${url}/layouts`,
        partialsDir: [
            `${url}/partials/`
        ]
    })
    app.enable('view cache')

    app.engine('.hbs', hbs.engine)

    app.set('views', url)
    app.use('/assets', express.static(`${url}/assets`))
    next()
}

export default {
    setAccounts,
    setFrontEnd
}