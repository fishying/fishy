import express from 'express'
import {tag} from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()


router.route('/')
    // get(tag.allView)
    .delete(passport.authenticateMiddleware(), tag.delete_verify, tag.delete)
    .post(passport.authenticateMiddleware(), tag.create_verify, tag.create)
    .put(passport.authenticateMiddleware(), tag.update_verify, tag.update)

// router.get('/:id', article.oneView)
// router.get('/slug/:slug', article.oneView)
export default router