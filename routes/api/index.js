import express from 'express'
import ctr from '../../controllers'

import article from './article'

const router = express.Router()

router.post('/login', ctr.log.login)
router.post('/register', ctr.log.register)
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