import express from 'express'
import { log } from '../../controllers'
import article from './article'
import tag from './tag'
import setting from './setting'
import user from './user'

import admin from './admin'

const router = express.Router()

router.post('/login', log.login_verify, log.login)
router.post('/register', log.register_verify, log.register)
router.get('/logout', log.logout)

router.use('/admin', admin)

router.use('/setting', setting)
router.use('/article', article)
router.use('/tag', tag)
router.use('/user', user)

export default router