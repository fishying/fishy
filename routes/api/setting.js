import express from 'express'
import { setting } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/')
    .get(setting.all)
    .put(passport.authenticateMiddleware(), setting.update_verify, setting.update)

export default router