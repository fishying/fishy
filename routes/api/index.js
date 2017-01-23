import express from 'express'
import {log} from '../../controllers'
import article from './article'
import tag from './tag'

//passport
import passport from '../../server/passport'

const router = express.Router()

router.post('/login', passport.authenticate('local'), log.login)
router.post('/register', log.register)
router.get('/logout', log.logout)

router.use('/article', article)
router.use('/tag', tag)

export default router