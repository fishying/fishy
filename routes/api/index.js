import express from 'express'
import ctr from '../../controllers'
import article from './article'
import User from '../../models/user'

//passport
import passport from '../../server/passport'

const router = express.Router()

router.post('/login', passport.authenticate('local'), ctr.log.login)
router.post('/register', ctr.log.register)
router.post('/test', passport.authenticateMiddleware() , function(req, res) {
    console.log(1)
})

router.post('/test1', async (req, res, next) => {
    User.register(new User({name: req.body.username}), req.body.password, (err, account) => {
        console.log(err)
    })
})
router.get('/logout', function(req, res) {
    req.logout()
    res.json({
        message: '退出成功'
    })
})

router
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
router.use('/article', article)

export default router