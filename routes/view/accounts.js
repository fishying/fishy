import express from 'express'

const router = express.Router()

router
    .get('/login', async (req, res) => {
        res.render('login', {
            title: 'login'
        }).end()
    })
    .get('/logon', async (req, res) => {
        res.render('logon', {
            title: 'login'
        }).end()
    })

export default router