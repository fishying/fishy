import express from 'express'
import { article } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router.route('/article')
    .post(passport.authenticateMiddleware(), (req, res) => {article.GetAll(req, res, true)})

router.route('/article/:id')
    .post(passport.authenticateMiddleware(), (req, res) => {article.GetOne(req, res, true)})

router.route('/article/slug/:slug')
    .post(passport.authenticateMiddleware(), (req, res) => {article.GetOne(req, res, true)})

export default router