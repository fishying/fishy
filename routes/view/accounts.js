import express from 'express'
import {article} from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router
    .get('/login', async (req, res) => {
        res.render('accounts/login', {
            title: 'login',
            layout: '/test'
        })
    })
    .get('/logon', async (req, res) => {
        res.render('accounts/logon', {
            title: 'login'
        })
    })

export default router