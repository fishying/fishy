import express from 'express'

const router = express.Router()

router
    .get('/login', async (req, res) => {
        res.render('accounts/login', {
            title: 'login'
        })
    })
    .get('/logon', async (req, res) => {
        res.render('accounts/logon', {
            title: 'login'
        })
    })

export default router