import express from 'express'

const router = express.Router()

router
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
    .get('/install', async (req, res) => {
        res.render('install', {
            title: 'install'
        })
    })
    .post('/install', async (req, res) => {
        console.log()
    })

export default router