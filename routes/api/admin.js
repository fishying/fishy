import express from 'express'
import { article } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/article')
    .get(passport.authenticateMiddleware(), (req, res) => {article.all(req, res, true)})


router.route('/article/:id')
    .get(passport.authenticateMiddleware(), (req, res) => {article.one(req, res, true)})

router.route('/article/slug/:slug')
    .get(passport.authenticateMiddleware(), (req, res) => {article.one(req, res, true)})

export default router