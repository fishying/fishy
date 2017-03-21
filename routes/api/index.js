import express from 'express'
import accounts from './accounts'
import article from './article'
import tag from './tag'
import setting from './setting'
import user from './user'
import upload from './upload'

import admin from './admin'

const router = express.Router()

router.use('/', accounts)
router.use('/admin', admin)

router.use('/setting', setting)
router.use('/article', article)
router.use('/tag', tag)
router.use('/user', user)
router.use('/upload', upload)

export default router