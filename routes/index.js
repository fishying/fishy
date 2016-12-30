import user from '../controllers/user'

export default (app) => {
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
        .post('/verify', user.verify)
}