import express from 'express'
import { tag } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()


router.route('/')
    .get(tag.all)
    .delete(passport.authenticateMiddleware(), tag.delete_verify, tag.delete)
    .post(passport.authenticateMiddleware(), tag.create_verify, tag.create)
    .put(passport.authenticateMiddleware(), tag.update_verify, tag.update)

router.get('/:id', tag.one)
router.get('/slug/:slug', tag.one)
export default router