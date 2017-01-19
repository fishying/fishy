import express from 'express'
import ctr from '../../controllers'
import article from './article'

//passport
import passport from '../../server/passport'

const router = express.Router()

router.post('/login', passport.authenticate('local'), ctr.log.login)
router.post('/register', ctr.log.register)
router.get('/logout', ctr.log.logout)

router
    .post('/', async (req, res, next) => {
        next()
    }, async (req, res) => {
        res.render('index', {
            title: 'tests',
            test: [{name: 'adfsdf'}]
        })
    })
router.use('/article', article)

export default router