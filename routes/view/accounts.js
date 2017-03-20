import express from 'express'
import { setting } from '../../models'
const router = express.Router()

router
    .get('/login', async (req, res) => {
        if (req.user) {
            return res.redirect('/admin')
        }
        res.render('login', {
            title: 'login'
        })
    })
    .get('/logon', async (req, res) => {
        res.render('logon', {
            title: 'login'
        })
    })
    .get('/install', async (req, res) => {
        let cbk = await setting.find()
        if (cbk.length > 0) {
            return res.redirect('/')
        }
        return res.render('install', {
            title: 'install'
        })
    })

export default router