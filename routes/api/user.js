import express from 'express'
import { user } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/')
    .get(user.find)
    .put(passport.authenticateMiddleware(), user.update)


export default router