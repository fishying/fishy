import express from 'express'
import {article} from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/')
    .get(function (req, res) {
        console.log(1)
    })
    .delete(passport.authenticateMiddleware(), article.delete_verify, article.delete)
    .post(passport.authenticateMiddleware(), article.create_verify, article.create)
    .put(passport.authenticateMiddleware(), article.update_verify, article.update)
export default router