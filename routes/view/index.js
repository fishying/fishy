import express from 'express'
import accounts from './accounts'
import article from './article'
import tag from './tag'
import admin from './admin'
import fp from 'path'

import { request } from '../../middleware'

import Global from '../../util/hbs-global.js'


const router = express.Router()

router.use(async function (req, res, next) {
    await Global.globalVar(req, res)
    next()
})

router
    .use('/admin/', admin)
    .use('/', accounts)
    .use(request.setFrontEnd)
    .get('/404', async (req, res) => {
        res.render('404', {
            title: 404
        })
    })
    .use('/', tag) 
    .use('/', article)

export default router