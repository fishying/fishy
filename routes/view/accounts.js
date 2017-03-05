import express from 'express'
import { request } from '../../middleware'

const router = express.Router()

router
    .use(request.setAccounts)
    .get('/login', async (req, res) => {
        res.render('login', {
            title: 'login'
        })
    })
    .get('/logon', async (req, res) => {
        res.render('logon', {
            title: 'login'
        })
    })

export default router