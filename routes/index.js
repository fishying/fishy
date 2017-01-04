import ctr from '../controllers'
const user = ctr.user
const article = ctr.article

export default (app) => {
    app.use(async (req, res, next) => {
        if (/^\/admin/.test(req.url)) {
            user.verify(req, res)
                .then(e => {
                    console.log(req.url)
                })
                .catch(err => {
                    return res.json({
                        success: false,
                        message: err
                    })
                })
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
        .post('/login', user.login)
        .post('/logon', user.logon)
        .post('/admin/article', article.add)
}