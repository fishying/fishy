import express from 'express'
import accounts from './accounts'
import article from './article'
import tag from './tag'

const router = express.Router()

router.use('/', accounts)
router.use('/', article)
router.use('/', tag)

export default router