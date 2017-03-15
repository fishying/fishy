import express from 'express'
import { setting } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/')
    .get(setting.GetAll)
    .put(passport.authenticateMiddleware(), setting.Verify.Put, setting.Put)

export default router