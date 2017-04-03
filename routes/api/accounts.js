import express from 'express'
import { login, register, install, logout, resetPwd, Verify } from '../../controllers/accounts'

import passport from '../../server/passport'
const router = express.Router()

router.post('/login', Verify.login, login)
router.post('/register', Verify.register, register)
router.post('/install', Verify.install, install)
router.get('/logout', logout)
router.post('/reset_pwd', passport.authenticateMiddleware(), resetPwd)


export default router