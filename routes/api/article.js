import express from 'express'
import { article } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/')
    .get(article.GetAll)
    .delete(passport.authenticateMiddleware(), article.Verify.Delete, article.Delete)
    .post(passport.authenticateMiddleware(), article.Verify.Post, article.Post)
    .put(passport.authenticateMiddleware(), article.Verify.Put, article.Put)

router.get('/:id', article.GetOne)
router.get('/slug/:slug', article.GetOne)

export default router