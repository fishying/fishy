import express from 'express'
import accounts from './accounts'
import article from './article'

const router = express.Router()

router.use('/', accounts)
router.use('/', article)

export default router