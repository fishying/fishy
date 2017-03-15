import express from 'express'
import { user } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/')
    .get(user.Get)
    .put(passport.authenticateMiddleware(), user.Put)

export default router