/**
 * Created by yuer on 2017/5/27.
 */
import express from 'express'
const router = express.Router()
import * as auth from '../middleware/auth'
import { User } from '../models'
router.get('/', auth.authenticated, async (req, res) => {
    let authInfo = req.redis.authInfo
    let user = await User.findById(authInfo.userId)
    res.render('index', {
        title: 'index',
        user: user
    })
})
router.get('/signup', auth.anonymous, async (req, res) => {
    res.render('signup', {
        title: 'Sign Up'
    })
})
router.get('/signin', auth.anonymous, async (req, res) => {
    let message = await req.flash('message')
    res.render('signin', {
        title: 'Sign In',
        message: message
    })
})
router.get('/signupdown', async (req, res) => {
    let message = await req.flash('message')
    if (!message) return res.redirect('/signin')
    res.render('signupdown', {
        title: 'Sign Up Down',
        message: message
    })
})

export default router