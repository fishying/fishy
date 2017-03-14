import express from 'express'
import { accounts } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()


router.post('/login', accounts.login_verify, accounts.login)
router.post('/register', accounts.register_verify, accounts.register)
router.post('/install', accounts.install_verify, accounts.install)
router.get('/logout', accounts.logout)


export default router