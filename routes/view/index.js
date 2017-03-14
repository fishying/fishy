import express from 'express'
import accounts from './accounts'
import article from './article'
import tag from './tag'
import fp from 'path'

import { request } from '../../middleware'

import Global from '../../util/hbs-global.js'

function relative(path) {
    return fp.join(__dirname, path)
}

const router = express.Router()

router.use(async function (req, res, next) {
    await Global.globalVar(req, res)
    next()
})

router
    .get('/favicon.ico', async (req, res) => {
        res.sendFile('favicon.ico', {
            root: relative('../../')
        }, async function (err) {
            if (err) {
                return res.status(404)
            }
        })
    })
    .use(request.setAccounts)
    .use('/', accounts)
    .use(request.setFrontEnd)
    .get('/404', async (req, res) => {
        res.render('404', {
            title: 404,
        })
    })
    .use('/', tag) 
    .use('/', article)

export default router