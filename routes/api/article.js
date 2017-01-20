import express from 'express'
import ctr from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()


router.route('/')
    .get(function (req, res) {
        console.log(1)
    })
    .delete(passport.authenticateMiddleware(), ctr.article.delete)
    .post(passport.authenticateMiddleware(), ctr.article.create)
    .put(passport.authenticateMiddleware(), ctr.article.update)
export default router