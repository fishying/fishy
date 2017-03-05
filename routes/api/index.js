import express from 'express'
import { log } from '../../controllers'
import article from './article'
import tag from './tag'

const router = express.Router()

router.post('/login', log.login_verify, log.login)
router.post('/register', log.register_verify, log.register)
router.get('/logout', log.logout)

router.use('/article', article)
router.use('/tag', tag)

export default router