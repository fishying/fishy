import api from './api'
import view from './view/accounts.js'
export default (app) => {
    app.use('/api', api)
    app.use('/', view)
    app
        .get('/', async (req, res, next) => {
            next()
        }, async (req, res) => {
            res.render('index', {
                title: 'tests',
                test: [{name: 'adfsdf'}],
                user: req.user
            })
        })
}