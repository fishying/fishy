import express from 'express'
import { request } from '../../middleware'

const router = express.Router()

router
    .get('/login', async (req, res) => {
        res.render('login', {
            title: 'login',
            layout: './default.hbs'
        })
    })
    .use(request.setAccounts)
    .get('/logon', async (req, res) => {
        res.render('logon', {
            title: 'login'
        })
    })
    .use(request.setAccounts)

export default router