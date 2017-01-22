import api from './api'

export default (app) => {
    app.use('/api', api)
    app
        .get('/', async (req, res, next) => {
            next()
        }, async (req, res) => {
            res.render('index', {
                title: 'tests',
                test: [{name: 'adfsdf'}]
            })
        })
}