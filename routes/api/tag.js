import express from 'express'
import {tag} from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()


router.route('/')
    .get(function (req, res) {
        console.log(1)
    })
    //.delete(passport.authenticateMiddleware(), ctr.article.delete_verify, ctr.article.delete)
    .post(passport.authenticateMiddleware(), tag.create_verify, tag.create)
    .put(passport.authenticateMiddleware(), tag.update_verify, tag.update)
export default router