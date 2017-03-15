import express from 'express'
import { tag } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()


router.route('/')
    .get(tag.GetAll)
    .delete(passport.authenticateMiddleware(), tag.Verify.Delete, tag.Delete)
    .post(passport.authenticateMiddleware(), tag.Verify.Post, tag.Post)
    .put(passport.authenticateMiddleware(), tag.Verify.Put, tag.Put)

router.get('/:id', tag.GetOne)
router.get('/slug/:slug', tag.GetOne)
export default router