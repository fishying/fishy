import express from 'express'
import accounts from './accounts'
import article from './article'
import tag from './tag'

import Global from '../../util/hbs-global.js'

const router = express.Router()

router.use(async function (req, res, next) {

    await Global.globalVar(req, res)

    next()
})

router.use('/', accounts)
router.use('/', article)
router.use('/', tag)

export default router