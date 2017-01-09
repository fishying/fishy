import ctr from '../controllers'
import api from '../api'

export default (app) => {
    app.use(async (req, res, next) => {
        if (/^\/admin/.test(req.url)) {
            api.log.verify(req, res)
                .then(() => {
                    next()
                })
                .catch(err => {
                    return res.json({
                        success: false,
                        message: err
                    })
                })
        } else {
            next()
        }
    })

    app
        .post('/', async (req, res, next) => {
            next()
        }, async (req, res) => {
            console.log(req.body)
            console.log(req.params)
            res.render('index', {
                title: 'tests',
                test: [{name: 'adfsdf'}]
            })
        })
        .post('/login', ctr.log.login)
        .post('/register', ctr.log.register)
        .post('/admin/article', ctr.article.create)
}